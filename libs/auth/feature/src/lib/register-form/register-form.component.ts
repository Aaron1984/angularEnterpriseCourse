import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthSignalstore } from '@lib/auth/data-access';

const passwordsMatchValidator: ValidatorFn = (group: AbstractControl) => {
  const pass = group.get('password')?.value ?? '';
  const confirm = group.get('confirmPassword')?.value ?? '';
  return pass === confirm ? null : { passwordsMismatch: true };
};

@Component({
  selector: 'lib-register-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {

  readonly store = inject(AuthSignalstore);

  private readonly fb = inject(FormBuilder);

  // Formulario tipado y no-nullable
  readonly form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(2)]),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
  }, { validators: [passwordsMatchValidator] });

  get f() {
    return this.form.controls;
  }

  get passwordsMismatch() {
    return this.form.hasError('passwordsMismatch');
  }

  handleRegister() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // Tu AuthSignalstore expone register(email, password)
    this.store.register(this.f.email.value, this.f.password.value);
  }
}
