export function setTitleAndMeta(
  title?: string,
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

const crop = (title: string, prefix: string) =>
  prefix + (title.length > 55 ? title.slice(0, 55) + "..." : title);

const setDocTitle = (title: string | undefined): void => {
  if (!(typeof title === "string")) {
    title = "Codamit - Tech Blog";
  }

  const prefix = process.env.NODE_ENV !== "production" ? "[DEV] - " : "";
  document.title = crop(title, prefix);
};
