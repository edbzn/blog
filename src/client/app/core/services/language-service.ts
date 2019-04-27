import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';

import { errorHandlerService } from './error-handler-service';

type Language = 'fr' | 'en';

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
    this.loadLang()
      .then(translation => {
        this._translation = translation;
        this._dateFnsLocale = this.lang === 'fr' ? frLocale : enLocale;
        this.languageLoaded = true;
      })
      .catch(err => errorHandlerService.throw(err));
  }

  translate(path: (string | number)[]): string | undefined {
    if (!this.languageLoaded) {
      console.warn(
        'Trying to translate at path ' + path.toString() + ' but language was not loaded'
      );
    }

    return (
      path.reduce(
        (acc, property) => (acc && acc[property] ? acc[property] : null),
        this._translation || {}
      ) || ''
    );
  }

  getLang(): string {
    return this.lang;
  }

  private loadLang() {
    return import(`../../i18n/${this.lang}.json`);
  }
}

export const languageService = new LanguageService();
