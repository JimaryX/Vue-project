
const Keys = {
  setting: "setting",
};

class ClientStorage {
  private _storage: Storage;
  private _prefix = "fcm.";

  constructor(store: "sessionStorage" | "localStorage") {
    this._storage = store === "sessionStorage" ? sessionStorage : localStorage;
    // if (!this.get(Keys.setting)) {
    //   this.set(Keys.setting, defaultSetting);
    //   // this.set(Keys.setting, getUserSetting(auth.user.userName));
    // }
  }

  getJson(key: string) {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  }

  get(key: string) {
    return this._storage.getItem(this._prefix + key);
  }

  set(key: string, value: object | string | number) {
    if (typeof value === "object") {
      value = JSON.stringify(value);
    } else if (typeof value === "number") {
      value = value.toString();
    }
    key = this._prefix + key;
    this._storage.setItem(key, value);
  }

  remove(key: string) {
    this._storage.removeItem(this._prefix + key);
  }

  plainSet(key: string, value: string) {
    this._storage.setItem(key, value);
  }
  plainGet(key: string) {
    this._storage.getItem(key);
  }
  plainRemove(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }
}

const store = new ClientStorage("localStorage");
export default store;

// export function getSetting() {
//   return store.getJson(Keys.setting) as ISetting;
// }

export const StorageKeys = Keys;
