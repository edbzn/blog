import {
  ProuterNextMiddleware,
  ProuterRequest,
  ProuterResponse,
  ProuterNavigationEvent,
} from 'prouter';

class ScrollRestorationService {
  scrollMap = new Map<string, number>();

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

    if (this.scrollMap.has(newPath)) {
      setTimeout(() => {
        window.scroll({ top: this.scrollMap.get(newPath) });
      }, 300);
    } else {
      window.scroll({ top: 0 });
    }
  };
}

export const scrollRestorationService = new ScrollRestorationService();
