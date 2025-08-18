import { afterNextRender, Component, effect, inject, Injector, runInInjectionContext, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { CommunicationShowcaseComponent } from '../communication-showcase/communication-showcase.component';

@Component({
  selector: 'lib-main-layout.component',
  imports: [
    RouterModule,
    HeaderComponent,
    // CommunicationShowcaseComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  @ViewChild(HeaderComponent) header!: HeaderComponent;

  private readonly router = inject(Router);
  private readonly injector = inject(Injector);

  constructor() {
    afterNextRender(() => {
      runInInjectionContext(this.injector, () => {
        effect(() => {
          if (!this.header) return; // por seguridad
          const action = this.header.navigationAction();

          if (action === 'login') {
            this.router.navigate(['/login']);
            this.header.navigationAction.set(null);
          } else if (action === 'register') {
            this.router.navigate(['/register']);
            this.header.navigationAction.set(null);
          }
        });
      });
    });
  }
}
