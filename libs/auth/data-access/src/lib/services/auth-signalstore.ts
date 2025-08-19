import { computed, inject, Injectable } from '@angular/core';
import { User } from '@lib/auth/domain';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { AuthService } from './auth.service';

type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

@Injectable({
  providedIn: 'root'
})
export class AuthSignalstore extends signalStore(
  // 1) Estado base
  withState<AuthState>(initialState),

  // 2) Derivados/computed
  withComputed((store) => ({
    isLoggedIn: computed(() => !!store.user()),
    userName:   computed(() => store.user()?.name ?? ''),
  })),

  // 3) Métodos (acciones) — se pueden inyectar dependencias aquí
  withMethods((store, auth = inject(AuthService)) => ({
    login(email: string, password: string) {
      patchState(store, { status: 'loading', error: null });

      auth.login(email, password).subscribe({
        next: (user) => {
          patchState(store, { user, status: 'authenticated', error: null });
          try {
            localStorage.setItem('authUser', JSON.stringify(user));
          } catch {
            // Manejo de errores
          }
        },
        error: () => {
          patchState(store, { status: 'error', error: 'Credenciales inválidas' });
        },
      });
    },

    register(email: string, password: string) {
      patchState(store, { status: 'loading', error: null });

      auth.register(email, password).subscribe({
        next: (user) => {
          patchState(store, { user, status: 'authenticated', error: null });
          try {
            localStorage.setItem('authUser', JSON.stringify(user));
          } catch {
            // Manejo de errores
          }
        },
        error: () => {
          patchState(store, { status: 'error', error: 'No se pudo registrar' });
        },
      });
    },

    logout() {
      patchState(store, { user: null, status: 'idle', error: null });
      try {
        localStorage.removeItem('authUser');
      } catch {
        // Manejo de errores
      }
    },
  })),

  // 4) Hooks del ciclo de vida del store (hidratar, etc.)
  withHooks({
    onInit(store) {
      try {
        const raw = localStorage.getItem('authUser');
        if (raw) {
          const user = JSON.parse(raw) as User;
          patchState(store, { user, status: 'authenticated', error: null });
        }
      } catch {
        // Manejo de errores
      }
    },
  })
) {}
