const Fly = require('../tools/fly.js');
const fly = new Fly();
const baseURI = "http://10.0.0.46:5765";
const baseURL = "http://10.0.0.46:5765";
fly.config.baseURI = baseURI;
fly.config.baseURL = baseURI;

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    //return Promise.resolve("ssss")
    console.log(err, 'err');
    console.log('网络错误，已进行拦截');
  }
)

export default fly;
