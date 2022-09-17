"use strict";
import axios from "axios";

const errorHandle = (status: number) => {
  switch (status) {
    case 401:
      alert('401')
      break;
    default:
  }
};

// 创建axios实例
const instance = axios.create({
  timeout: 1000 * 30,
});
const isProduction: boolean = process.env.NODE_ENV === "production";
// 设置post请求头
instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
instance.interceptors.request.use(
  (config: any) => {
    config.cancelToken = new axios.CancelToken((cancel) => {
    });
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: any) => {
    //请求成功
    if (response.status === 200) {
      const { code, msg } = response.data;
      if (code === 1) {
        return Promise.resolve(response.data);
      } else {
        errorHandle(code);
      }
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);
    }
  },
  (error: any) => {
    const { response, message, msg } = error;
    if (response) {
      errorHandle(response.status);
      return Promise.resolve(response.data);
    } else {
      if (message === "cancel" || msg === "cancel") return;
      return Promise.reject({ msg: "网络错误" });
    }
  }
);

export default instance;
