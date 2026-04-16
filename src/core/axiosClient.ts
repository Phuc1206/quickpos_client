import axiosClient from "axios";
import localStorageClient from "./localStorageClient";

export type TAPIResponse<IDataResponseType> = Promise<
  | {
      status: "failure";
      statusCode?: number;
      data?: IDataResponseType;
      message?: string;
      count?: number;
    }
  | {
      status: "existed";
      statusCode?: number;
      data: IDataResponseType;
      message?: string;
      count?: number;
    }
  | {
      status: "successfully";
      statusCode?: number;
      data: IDataResponseType;
      message?: string;
      count?: number;
    }
>;

axiosClient.interceptors.request.use(
  function (config) {
    if (!localStorageClient.token) return config;

    return {
      ...config,
      headers: {
        "Content-Type": "apllication/json",
        Authorization: localStorageClient.token,
        ...config.headers
      }
    };
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(function (res) {
  // remove all token
  const headerRemoveToken: string | undefined = res.headers["remove-token"];

  if (headerRemoveToken === "all") {
    localStorageClient.token = undefined;
  }

  // save token
  const headerTokens: string | undefined = res.headers["set-token"];

  if (!headerTokens) return res;

  localStorageClient.token = headerTokens;
  return res;
});

export default axiosClient;
