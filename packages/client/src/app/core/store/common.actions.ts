export const FAILURE = '[COMMON] FAILURE';

export const failure = (error: any) => ({ type: FAILURE, payload: error });
