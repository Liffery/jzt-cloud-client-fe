import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";

export interface RAxiosRequestConfig<D = any> extends AxiosRequestConfig {
  onError?: Function;
  cancelRepeat?: boolean;
}

export interface RAxiosResponse<T = any, D = any> extends AxiosResponse {
  config: RInternalAxiosRequestConfig<D>;
}

export interface RInternalAxiosRequestConfig<D = any>
  extends RAxiosRequestConfig<D> {
  headers: AxiosRequestHeaders;
}
