import axios from "axios";
import qs from "qs";
import { useFetchStore } from "/@/store/fetch";
import {
  RAxiosRequestConfig,
  RAxiosResponse,
  RInternalAxiosRequestConfig,
} from "./types";
import type { AxiosInstance, CreateAxiosDefaults } from "axios";
import { AxiosAbortController } from "./abort";
import { message } from "ant-design-vue";
import { localStorage } from "/@/utils/use";
import { TOKEN_KEY, USER_KEY } from "/@/constant/AppEnum";
import { router } from "/@/router/index";
const env = import.meta.env;

class rAxios {
  private axiosInstance: AxiosInstance;
  constructor(options: CreateAxiosDefaults) {
    const axiosInstance = axios.create(options);
    this.axiosInstance = axiosInstance;
    this.setupInterceptors();
  }
  //统一处理
  //取消发送

  private setupInterceptors() {
    //  this.axiosInstance.interceptors.request.use((res) => {});
    const axiosAbortController = new AxiosAbortController();
    this.axiosInstance.interceptors.request.use(
      (config: RInternalAxiosRequestConfig) => {
        const { url, cancelRepeat = true, method } = config;
        const fetchStore = useFetchStore();

        fetchStore.setLoading(`${method}&${url}` as string, true);

        cancelRepeat && axiosAbortController.addPending(config);

        // 登录接口不允许传token
        if (url && !/\/login$/.test(url)) {
          config.headers.token = localStorage.getItem(TOKEN_KEY);
        }
        if (url && /\/login$/.test(url) && localStorage.getItem("visitorId")) {
          config.headers["X-Customize-User-Fingerprint"] =
            localStorage.getItem("visitorId");
        }

        return config;
      }
    );

    this.axiosInstance.interceptors.response.use(
      (res: RAxiosResponse) => {
        const {
          data,
          config: { url, onError, method, responseType },
        } = res;

        axiosAbortController.removePending(res.config);
        const fetchStore = useFetchStore();
        fetchStore.setLoading(`${method}&${url}` as string, false);

        const { code, msg } = data;
        if (responseType != "blob" && code != "0") {
          if (onError) {
            onError(data);
          } else {
            message.error(msg);
          }

          throw new Error();
        }
        return data;
      },
      (err) => {
        try {
          const {
            config: { url, method },
            response: { status },
          } = err;
          const reg = /^(5)\d{2}$/;
          const fetchStore = useFetchStore();
          fetchStore.setLoading(`${method}&${url}` as string, false);
          if (reg.test(status)) {
            message.error("服务器出错，请稍后再试");
          }
          // token 失效
          if (status === 401) {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem("visitorId");
            // router.replace("/login");
          }
        } catch (error) {
          throw new Error(error as unknown as string);
        }
        return Promise.reject(err);
      }
    );
  }
  get<T = any>(config: RAxiosRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "GET",
      paramsSerializer: {
        serialize: (params: any) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
      },
    });
  }

  post<T = any>(config: RAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  put<T = any>(config: RAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "PUT" });
  }

  delete<T = any>(config: RAxiosRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  request<T = any>(config: RAxiosRequestConfig): Promise<T> {
    const conf: RAxiosRequestConfig = config;

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, RAxiosResponse<Result>>(conf)
        .then((res: RAxiosResponse<Result>) => {
          try {
            //    const ret = transformRequestHook(res, opt);
            resolve(res as unknown as Promise<T>);
          } catch (err) {
            reject(err || new Error("request error!"));
          }
          return;
        })
        .catch((e: Error) => {
          reject(e);
        });
    });
  }
}

interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export default rAxios;
