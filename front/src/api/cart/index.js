import { axiosInstance } from "..";

export const getCart = (userId) => {
  return axiosInstance.get(`/baskets/${userId}`);
};

export const addProductToCartApi = (userId, goodId, amount) => {
  // return axiosInstance.post(`/baskets/${userId}/goods`, {goodId: goodId, amount});
  return axiosInstance.post(`${userId}/add`, {goodId: goodId, amount});
};

export const changeProductAmountApi = (userId, goodId, amount) => {
  // return axiosInstance.patch(`/baskets/${userId}/good`, {goodId: goodId, amount});
  return axiosInstance.patch(`${userId}/good`, {goodId: goodId, amount});
};

export const removeProductFromCartApi = (userId, goodId) => {
  // return axiosInstance.delete(`/baskets/${userId}/deleteGood/${goodId}`);
  return axiosInstance.delete(`${userId}/good/${goodId}`);
};