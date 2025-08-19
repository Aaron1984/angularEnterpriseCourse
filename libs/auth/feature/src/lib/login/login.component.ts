import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService, AuthSignalstore, AuthStoreService } from '@lib/auth/data-access';

@Component({
  selector: 'lib-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // // Signals para estado interno
  // readonly email = signal('');
  // readonly password = signal('');
  // readonly error = signal('');

  // // Computed: validación de formulario
  // readonly validForm = computed(() =>
  //   this.email().includes('@') && this.password().length >= 6
  // );

  // // Servicio de estado de autenticación
  // public authStore = inject(AuthStoreService);
  // // Servicio de autenticación
  // private authService = inject(AuthService);

  // constructor() {
  //   // Effect: ejecutar acción cuando el estado de login cambie
  //   effect(() => {
  //     if (this.authStore.isLoggedIn()) {
  //       console.log('Usuario logueado:', this.authStore.user());
  //     } else {
  //       console.log('No hay sesión activa');
  //     }
  //   });
  // }

  // handleLogin() {
  //   if (!this.validForm()) return;

  //   this.authService.login(this.email(), this.password()).subscribe({
  //     next: (user) => {
  //       this.authStore.login(user); // Manda el usuario al store
  //       this.error.set('');
  //     },
  //     error: () => {
  //       this.error.set('Usuario o contraseña inválidos');
  //     }
  //   });
  // }

  // handleLogout() {
  //   this.authStore.logout();
  // }


  // -------------------------------------

  // Store NgRx Signals
  readonly store = inject(AuthSignalstore);

  // Estado local del formulario (signals)
  readonly email = signal('');
  readonly password = signal('');

  // Validación mínima
  readonly validForm = computed(
    () => this.email().includes('@') && this.password().length >= 6
  );

  handleLogin() {
    if (!this.validForm()) return;
    this.store.login(this.email(), this.password());
  }

  handleLogout() {
    this.store.logout();
  }

}
