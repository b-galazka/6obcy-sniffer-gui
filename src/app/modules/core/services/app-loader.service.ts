import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { GuardsCheckEnd, GuardsCheckStart, Router, RouterEvent } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppLoaderService {
  private readonly appLoaderElem: HTMLElement;
  private readonly renderer: Renderer2;

  private activeLoaders = 0;

  constructor(
    private readonly router: Router,
    @Inject(DOCUMENT) document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.appLoaderElem = document.querySelector('#app-loader') as HTMLElement;
  }

  initRoutingLoader(): void {
    this.router.events.subscribe(event => this.handleRouterEvent(event as RouterEvent));
  }

  private handleRouterEvent(event: RouterEvent): void {
    if (event instanceof GuardsCheckStart) {
      this.showLoader();
    } else if (event instanceof GuardsCheckEnd) {
      this.hideLoader();
    }
  }

  showLoader(): void {
    ++this.activeLoaders;

    this.renderer.setStyle(this.appLoaderElem, 'visibility', 'visible');
  }

  hideLoader(): void {
    this.activeLoaders = Math.max(0, this.activeLoaders - 1);

    if (this.activeLoaders === 0) {
      this.renderer.setStyle(this.appLoaderElem, 'visibility', 'hidden');
    }
  }
}
