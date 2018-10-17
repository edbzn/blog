import _fetch from "./fetch";

function getExtname(filename: string): string | undefined {
  return filename.split(".").pop();
}

export async function upload(file: File): Promise<{ path: string}> {
  const extname = getExtname(file.name);

  if (!extname) {
    return Promise.reject("No extension file found");
  }
  if (!["jpg", "png"].includes(extname)) {
    return Promise.reject("Unsupported MIME-Type");
  }

  const response = await _fetch(`http://localhost:8082`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    body: file,
    headers: {
      "Content-Type": "image/" + extname,
    },
  });

  return await response.json();
}
