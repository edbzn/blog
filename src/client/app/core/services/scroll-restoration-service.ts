import {
  ProuterNextMiddleware,
  ProuterRequest,
  ProuterResponse,
  ProuterNavigationEvent,
} from 'prouter';

class ScrollRestorationService {
  scrollMap = new Map<string, number>();

  private RESTORATION_DELAY = 800;
  private restorationRef: number;

  constructor() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }

  registerScrollPosition = (
    req: ProuterRequest,
    res: ProuterResponse,
    next: ProuterNextMiddleware
  ): void => {
    this.scrollMap.set(window.location.pathname, window.scrollY);
    next();
  };

  restoreScrollPosition = (navigation: ProuterNavigationEvent): void => {
    const { newPath } = navigation;
    window.clearTimeout(this.restorationRef);

    if (this.scrollMap.has(newPath)) {
      const top = this.scrollMap.get(newPath);
      this.scrollMap.delete(newPath);
      this.restorationRef = window.setTimeout(() => {
        window.scroll({ top });
      }, this.RESTORATION_DELAY);
    } else {
      window.scroll({ top: 0 });
    }
  };
}

export const scrollRestorationService = new ScrollRestorationService();
