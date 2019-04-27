import { directive, Part } from 'lit-html';

import { languageService } from '../services/language-service';

export const translate = directive((translationKey: string) => (part: Part) => {
  part.setValue(languageService.translate(translationKey.split('.')));
});
