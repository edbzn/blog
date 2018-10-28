import router from "../../app-router";

export const createErrorURI = (e: any | Error): string => {
  return "/error?message=" + encodeURIComponent(e.message || e.toString());
};

export const showError = (e: any | Error): void => {
  router.push(createErrorURI(e));
};
