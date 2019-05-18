export const LOAD_EDITOR = '[ADMIN] LOAD_EDITOR';
export const LOAD_EDITOR_SUCCESS = '[ADMIN] LOAD_EDITOR_SUCCESS';
export const EDIT_MARKDOWN = '[ADMIN] EDIT_MARKDOWN';
export const CONVERT_MD_TO_HTML = '[ADMIN] CONVERT_MD_TO_HTML';
export const EDIT_TITLE = '[ADMIN] EDIT_TITLE';
export const EDIT_META_TITLE = '[ADMIN] EDIT_META_TITLE';
export const EDIT_META_DESCRIPTION = '[ADMIN] EDIT_META_DESCRIPTION';
export const EDIT_LANG = '[ADMIN] EDIT_LANG';
export const EDIT_SLUG = '[ADMIN] EDIT_SLUG';
export const EDIT_TAGS = '[ADMIN] EDIT_TAGS';
export const PUBLISH = '[ADMIN] PUBLISH';
export const DE_PUBLISH = '[ADMIN] DE_PUBLISH';

export const loadEditor = (element: HTMLTextAreaElement, initialValue: string) => ({
  type: LOAD_EDITOR,
  payload: { element, initialValue },
});

export const loadEditorFulfilled = (editor: SimpleMDE) => {
  return {
    type: LOAD_EDITOR_SUCCESS,
    payload: editor,
  };
};

export const editMarkdown = (markdown: string) => ({
  type: EDIT_MARKDOWN,
  payload: markdown,
});

export const convertMdToHtml = (markdown: string) => {
  return {
    type: CONVERT_MD_TO_HTML,
    payload: markdown,
  };
};

export const editTitle = (str: string) => ({
  type: EDIT_TITLE,
  payload: str,
});

export const editTags = (str: string) => ({
  type: EDIT_TAGS,
  payload: str,
});

export const editMetaTitle = (str: string) => ({
  type: EDIT_META_TITLE,
  payload: str,
});

export const editMetaDescription = (str: string) => ({
  type: EDIT_META_DESCRIPTION,
  payload: str,
});

export const editLang = (str: string) => ({
  type: EDIT_LANG,
  payload: str,
});

export const editSlug = (str: string) => ({
  type: EDIT_SLUG,
  payload: str,
});

export const publish = () => ({
  type: PUBLISH,
});

export const dePublish = () => ({
  type: DE_PUBLISH,
});
