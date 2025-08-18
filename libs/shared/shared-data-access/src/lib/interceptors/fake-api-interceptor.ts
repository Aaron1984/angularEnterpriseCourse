import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { delay, of } from 'rxjs';

const ok = <T>(body: T, ms = 600) => of(
  new HttpResponse<T>({ status: 200, body })).pipe(delay(ms)
);

export const fakeApiInterceptor: HttpInterceptorFn = (req, next) => {
  const { url, method } = req;

  if (url.endsWith('/api/login') || url.endsWith('/api/user')) {
    const user = {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@email.com',
      roles: ['admin']
    };

    return ok(user, 500);
  }

  if (url.endsWith('/api/register') && method === 'POST') {
    const user = {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@email.com',
      roles: ['admin']
    };

    return ok(user, 700);
  }

  return next(req);
};
