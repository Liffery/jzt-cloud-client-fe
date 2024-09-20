import type { AxiosRequestConfig } from "axios";

const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, deleteNumber(config.url as string)].join("&");

const deleteNumber = function (str: string) {
  const reg = /[0-9]+/g;
  return str.replace(reg, "");
};

export class AxiosAbortController {
  private pendingMap: Map<string, AbortControllerType>;
  constructor() {
    this.pendingMap = new Map();
  }
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    if (!this.pendingMap.has(url)) {
      this.pendingMap.set(url, controller);
    }
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);
    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      cancel && cancel.abort();
      this.pendingMap.delete(url);
    }
  }

  reset(): void {
    this.pendingMap = new Map();
  }
}

type AbortControllerType = AbortController;
