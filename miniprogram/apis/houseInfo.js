import fly from '../config/fly_config.js'
//房源上存
export const createHouse = (obj) => {
  obj.tenantId = "fangyuanxingqiu";
  return fly.post("/house-srv/house/create", obj);
};
//查询用户房源里列表
export const getUserHouse = (id) => {
  return fly.get(`/house-srv/house/retrieveByUploaderId/${id}`);
};
//删除房源
export const deleteUserHouse = (obj) => {
  return fly.post(`/house-srv/house/deleteByIdAndUploaderId`,obj);
};