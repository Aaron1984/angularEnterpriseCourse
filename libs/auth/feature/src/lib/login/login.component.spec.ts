import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { computed, signal } from '@angular/core';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { AuthSignalstore } from '@lib/auth/data-access';

// --- Tipos mínimos para el mock
type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'error';
interface User { id: string; email: string; name: string; }

// --- Mock de la Signal Store (simula la API de tu AuthSignalstore)
class MockAuthSignalstore {
  status = signal<AuthStatus>('idle');
  error = signal<string | null>(null);
  user = signal<User | null>(null);
  isLoggedIn = computed(() => !!this.user());
  userName = computed(() => this.user()?.name ?? '');

  login = jest.fn((email: string, password: string) => {
    // comportamiento “feliz” por defecto
    this.user.set({ id: '1', email, name: 'Test' });
    this.status.set('authenticated');
    this.error.set(null);
  });

  logout = jest.fn(() => {
    this.user.set(null);
    this.status.set('idle');
  });
}

describe('LoginComponent (standalone + NgRx Signals store)', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;
  let store: MockAuthSignalstore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,         // standalone
        RouterTestingModule,    // por el routerLink del template
      ],
      providers: [
        { provide: AuthSignalstore, useClass: MockAuthSignalstore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(AuthSignalstore) as unknown as MockAuthSignalstore;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('muestra el formulario cuando NO está logueado', () => {
    store.user.set(null);
    store.status.set('idle');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));
    expect(form).toBeTruthy();

    const welcome = fixture.debugElement.query(By.css('p'));
    expect(welcome?.nativeElement.textContent).not.toContain('Bienvenido');
  });

  it('deshabilita el botón cuando el formulario es inválido', () => {
    // email vacío y password corta -> inválido
    component.email.set('');
    component.password.set('123');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(btn.disabled).toBe(true);
  });

  it('habilita el botón y llama a auth.login con email y password válidos', () => {
    component.email.set('user@example.com');
    component.password.set('secreto123');
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit')); // (ngSubmit)

    expect(store.login).toHaveBeenCalledWith('user@example.com', 'secreto123');
  });

  it('muestra estado "Cargando…" cuando status === loading', () => {
    component.email.set('user@example.com');
    component.password.set('secreto123');
    store.status.set('loading');
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    expect(btn.disabled).toBe(true);
    expect(btn.textContent?.toLowerCase()).toContain('cargando');
  });

  it('muestra bienvenida y botón de logout cuando está autenticado', () => {
    store.user.set({ id: '1', email: 'test@resergo.com', name: 'Test' });
    store.status.set('authenticated');
    fixture.detectChanges();

    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toContain('Bienvenido');

    const logoutBtn = fixture.debugElement.query(By.css('button[type="button"]'));
    logoutBtn.triggerEventHandler('click', {});
    expect(store.logout).toHaveBeenCalled();
  });

  it('muestra el error cuando store.error() tiene mensaje', () => {
    store.error.set('Credenciales inválidas');
    fixture.detectChanges();

    const err = fixture.debugElement.query(By.css('.error'));
    expect(err.nativeElement.textContent).toContain('Credenciales inválidas');
  });
});

