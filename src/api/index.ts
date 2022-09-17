import axios from "./http"; //导入http中创建的axios实例
const api = 'https://itunes.apple.com/';
const https = {
  getData(data:string) {
    return axios.get(`${api}hk/lookup?id=${data}`);
  },
  // 顶部放大应用程序
  topgrossingapplications(data:string|number) {
    return axios.get(`${api}hk/rss/topgrossingapplications/limit=${data}/json`);
  },
  // 顶级免费应用程序
  topfreeapplications(data:string|number) {
    return axios.get(`${api}hk/rss/topfreeapplications/limit=${data}/json`);
  },
};

export default https;
