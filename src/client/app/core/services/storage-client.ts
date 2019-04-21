import { v1 as uuid } from "uuid";
import { _fetch } from "../../utils/fetch";

class StorageClient {
  private authToken = process.env.DROPBOX_ACCESS_TOKEN;
  private baseUrl = "https://content.dropboxapi.com/2";
  private shareBaseUrl = "https://api.dropboxapi.com/2";

  async upload(articleUuid: string, file: File): Promise<{ path: string }> {
    const extName = StorageClient.getExtname(file.name);
    const path = "/posters/article_" + articleUuid + "__" + uuid().slice(0, 5) + "." + extName;
    const url = this.baseUrl + "/files/upload";
    const apiArgs = {
      path: path,
      mode: "add",
      autorename: false,
      mute: false,
      strict_conflict: false,
    };

    this.validate(extName);

    await _fetch(url, {
      method: "POST",
      body: file.slice(0, file.size),
      headers: {
        "Content-Type": "application/octet-stream",
        Authorization: "Bearer " + this.authToken,
        "Dropbox-API-Arg": JSON.stringify(apiArgs),
      },
    });

    const response = await _fetch(
      this.shareBaseUrl + "/sharing/create_shared_link_with_settings",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path,
          settings: {
            requested_visibility: "public",
          },
        })
      },
    );

    const fileSettings = await response.json();

    return { path: fileSettings.url.split("?")[0] + "?dl=1" };
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
