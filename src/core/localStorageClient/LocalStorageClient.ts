interface IClientStorage {
  token?: string;
  userInfo?: unknown; // edit later
}

const STORAGE_KEY = "KEYBALL_CLIENT_STORAGE";

export default class LocalStorageClient {
  private static _instance?: LocalStorageClient;
  public static get instance() {
    if (!this._instance) this._instance = new LocalStorageClient();
    return this._instance;
  }

  private data: IClientStorage = {};

  protected constructor() {
    this.load();

    // event config
    if (!window) return;
    window.addEventListener("storage", () => {
      this.handlerStorageChange();
    });
  }

  private handlerStorageChange = () => {
    this.load();
  };

  private save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
  }

  private load() {
    const v = localStorage.getItem(STORAGE_KEY);

    // case data in localStorage not exists;
    if (!v) {
      this.save();
      return;
    }

    // convert to object
    try {
      this.data = JSON.parse(v);
    } catch (error: unknown) {
      console.error("parse to object fail", error);
    }
  }

  // token
  public get token() {
    return this.data.token;
  }

  public set token(v: string | undefined) {
    this.data.token = v;
    this.save();
  }

  public get userInfo() {
    if (!this.data.userInfo) return undefined;

    return {
      ...this.data.userInfo
    } as unknown; // edit later
  }

  public set userInfo(v: unknown | undefined) {
    if (!v) {
      this.data.userInfo = undefined;
      this.save();
      return;
    }

    this.data.userInfo = {
      ...v
    };
    this.save();
  }
}
