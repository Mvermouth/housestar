import fly from '../config/fly_config.js'

export const userLogin = (str) => {
  return fly.get(`/house-srv/uploader/wechatLogin/${str}`);
};
export const userInfoUp = (obj) => {
  return fly.post("/house-srv/uploader/syncUserInfo",obj);
};
