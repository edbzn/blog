interface MetaDataOpts {
  title?: string | undefined;
  description?: string | undefined;
  metaTitle?: string | undefined;
  metaDescription?: string | undefined;
}

export function setPageMeta(opts: MetaDataOpts = {}): void {
  setTitle(opts);
  setDescription(opts);
}

const setDescription = (opts: MetaDataOpts): void => {
  if (opts.description) {
    let meta = document.getElementsByTagName("meta");

    for (let i = 0; i < meta.length; i++) {
      if (
        (meta[i].name.toLowerCase().includes("description") &&
          meta.item(i) !== null) ||
        (meta[i].attributes.getNamedItem("property") !== null &&
          meta[i].attributes
            .getNamedItem("property")!
            .value.includes("description"))
      ) {
        (meta.item(i) as HTMLMetaElement).setAttribute(
          "content",
          typeof opts.metaDescription === "string"
            ? opts.metaDescription
            : opts.description,
        );
      }
    }
  }
};

const setTitle = (opts: MetaDataOpts): void => {
  let title = null;
  if (typeof opts.metaTitle === "string") {
    title = opts.metaTitle;
  } else if (typeof opts.title === "string") {
    title = opts.title;
  } else {
    title = "Codamit - Tech Blog";
  }

  if (title.length > 55) {
    console.warn("Title too long for crawlers " + title);
  }

  const prefix = process.env.NODE_ENV !== "production" ? "[DEV] - " : "";
  document.title = `${prefix}${title}`;
};
