import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
import { ProuterNextMiddleware, ProuterRequest, ProuterResponse } from 'prouter';

import { errorHandlerService } from './error-handler-service';

export type Language = 'fr' | 'en';

class LanguageService {
  private default: Language = 'en';

  private lang: Language;

  private _translation: any;

  private _dateFnsLocale: any;

  private languageLoaded = false;

  get dateFnsLocale(): any {
    return this._dateFnsLocale;
  }

  constructor() {
    const lang = navigator.language.split('-')[0];
    this.lang = lang.match(/[en|fr]/) ? (lang as Language) : this.default;
  }

  translate(path: (string | number)[]): string | undefined {
    if (!this.languageLoaded) {
      errorHandlerService.throw(
        'Trying to translate at path ' + path.toString() + ' but language was not loaded'
      );
    }

    const translation = path.reduce(
      (acc, property) => (acc && acc[property] ? acc[property] : null),
      this._translation
    );

    if (!(typeof translation === 'string')) {
      console.warn(`Translation not found at path "${path.join('.')}"`);
    }

    return translation;
  }

  getLang(): string {
    return this.lang;
  }

  loadLangMiddleware = async (
    req: ProuterRequest,
    res: ProuterResponse,
    next: ProuterNextMiddleware
  ) => {
    await this.loadLang();
    next();
  };

  private async loadLang() {
    try {
      const translation = await import(`../../i18n/${this.lang}.json`);
      this._translation = translation;
      this._dateFnsLocale = this.lang === 'fr' ? frLocale : enLocale;
      this.languageLoaded = true;
    } catch (error) {
      errorHandlerService.throw(error);
    }
  }
}

export const languageService = new LanguageService();
