import _fetch from "../utils/fetch";
import { v1 as uuid } from "uuid";

class StorageClient {
  private authToken = `ya29.GltMBkIX9SkHbuXITpjZ_On2y1uoTYt4Uvn9UX-tXcgoyzM3wxmKvn5oAtA6AYwsB4M0_SRn0EtWJlFB4I2vya4ZUCAnPqnqVvriah1LOC4erCltTcNCHiuZGEJF`;

  constructor() {
    // maybe implement a refresh token
  }

  async upload(file: File): Promise<{ path: string }> {
    const fileName = file.name + "-" + uuid();
    const extName = StorageClient.getExtname(file.name);

    this.validate(extName);

    const url = (process.env.STATIC_BASE_URL as string) + fileName;
    const response = await _fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: file,
      headers: {
        "Content-Type": "image/" + extName,
        Authorization: "Bearer " + this.authToken,
      },
    });

    return await response.json();
  }

  private async validate(extName: string | undefined): Promise<void> {
    if (!extName) {
      return Promise.reject("No extension file found");
    }
    if (!["jpg", "png", "jpeg", "gif"].includes(extName)) {
      return Promise.reject("Unsupported MIME-Type");
    }
  }

  private static getExtname(fileName: string): string | undefined {
    return fileName.split(".").pop();
  }
}

export const storageService = new StorageClient();
