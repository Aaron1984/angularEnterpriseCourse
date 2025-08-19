import { Route } from '@angular/router';
import { MainLayoutComponent } from '@lib/shared/ui';

export const appRoutes: Route[] = [
    {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@lib/auth/feature').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@lib/auth/feature').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'register-form',
        loadComponent: () =>
          import('@lib/auth/feature').then(
            (m) => m.RegisterFormComponent
          ),
      }
    ],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
