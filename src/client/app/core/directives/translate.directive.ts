import { directive, Part } from 'lit-html';

import { languageService } from '../services/language-service';

export const getTranslation = (translationKey: string) =>
  languageService.translate(translationKey.split('.'));

export const translate = directive((translationKey: string) => (part: Part) => {
  part.setValue(getTranslation(translationKey));
});
