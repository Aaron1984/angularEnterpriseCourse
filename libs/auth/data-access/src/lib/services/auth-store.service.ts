import { computed, effect, Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@lib/auth/domain';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  // Estado interno
  private _user: WritableSignal<User | null> = signal(null);
  private _isLoggedIn: WritableSignal<boolean> = signal(false);

  // Expuestos como readonly
  readonly user = this._user.asReadonly();
  readonly isLoggedIn = this._isLoggedIn.asReadonly();

  // Estado computado
  readonly userName = computed(() => this._user()?.name ?? '');

  constructor() {
    // Restaurar sesión desde localStorage
    const saved = localStorage.getItem('user');
    if (saved) {
      const user = JSON.parse(saved) as User;
      this._user.set(user);
      this._isLoggedIn.set(true);
    }

    // Efecto: guardar sesión en localStorage
    effect(() => {
      if (this._isLoggedIn()) {
        localStorage.setItem('user', JSON.stringify(this._user()));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  login(user: User) {
    this._user.set(user);
    this._isLoggedIn.set(true);
  }

  logout() {
    this._user.set(null);
    this._isLoggedIn.set(false);
  }

}
