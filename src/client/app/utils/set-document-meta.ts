export function setTitleAndMeta(
  title: string,
  description?: string | undefined,
): void {
  document.title = title.length > 55 ? title.slice(0, 55) + "..." : title;

  if (description) {
    let meta = document.getElementsByTagName("meta");
    for (let i = 0; i < meta.length; i++) {
      if (meta[i].name.toLowerCase().includes("description")) {
        if (meta.item(i) !== null) {
          (meta.item(i) as HTMLMetaElement).setAttribute(
            "content",
            description,
          );
        }
      }
    }
  }
}
