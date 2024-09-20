type storageType = string | number | object | boolean;
class LocalStorage {
  private keys: string[];
  constructor() {
    this.keys = [];
  }
  setItem(key: string, item: storageType) {
    // this.keys.push(key);
    window.localStorage.setItem(
      key,
      typeof item == "string" ? item : JSON.stringify(item)
    );
  }
  getItem(key: string) {
    const item = window.localStorage.getItem(key);

    try {
      if (!item) return null;
      const itemJson = JSON.parse(item);
      return itemJson;
    } catch (error) {
      return item;
    }
  }
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
export const localStorage = new LocalStorage();
