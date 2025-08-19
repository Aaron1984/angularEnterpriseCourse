import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AuthStoreService } from '@lib/auth/data-access';
import { User } from '@lib/auth/domain';

@Component({
  selector: 'lib-register',
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly error = signal('');

  readonly validForm = computed(() =>
    this.name().length > 1 &&
    this.email().includes('@') &&
    this.password().length >= 6
  );

  public authStore = inject(AuthStoreService);

  private authService = inject(AuthService);

  private router = inject(Router);
  constructor() {
    effect(() => {
      if (this.authStore.isLoggedIn()) {
        this.router.navigate(['/']);
      }
    });
  }

  handleRegister() {
    if (!this.validForm()) return;

    this.authService.register(this.email(), this.password()).subscribe({
      next: (user: User) => {
        this.authStore.login(user);
        this.error.set('');
      },
      error: () => {
        this.error.set('El registro ha fallado');
      },
    });
  }

  handleLogout() {
    this.authStore.logout();
  }
}
