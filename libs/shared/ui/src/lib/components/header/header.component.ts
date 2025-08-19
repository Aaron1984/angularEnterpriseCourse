import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthSignalstore, AuthStoreService } from '@lib/auth/data-access';

@Component({
  selector: 'lib-header',
  imports: [

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  navigationAction: WritableSignal<'login' | 'logout' | 'register' | 'register-form' | null> = signal(null);
  exampleInput = signal('');
  store = inject(AuthSignalstore);

  goToLogin() {
    this.navigationAction.set('login');
  }

  goToRegisterForm() {
    this.navigationAction.set('register-form');
  }

  goToRegister() {
    this.navigationAction.set('register');
  }

  setExampleInput(value: string) {
    this.exampleInput.set(value);
  }

  logout() {
    this.navigationAction.set('logout');
  }
}
