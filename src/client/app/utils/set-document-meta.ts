export function setTitleAndMeta(
  title: string,
  description?: string | undefined,
): void {
  setDocTitle(title);

  if (description) {
    let meta = document.getElementsByTagName("meta");

    for (let i = 0; i < meta.length; i++) {
      if (
        meta[i].name.toLowerCase().includes("description") &&
        meta.item(i) !== null
      ) {
        (meta.item(i) as HTMLMetaElement).setAttribute("content", description);
      }
    }
  }
}

const setDocTitle = (title: string): void => {
  const prefix = process.env.NODE_ENV !== "production" ? "[DEV] - " : "";
  document.title =
    prefix + (title.length > 55 ? title.slice(0, 55) + "..." : title);
};
