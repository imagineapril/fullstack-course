import { axiosInstance } from "..";

export const makeOrder = (payload, userId) =>  {
  return axiosInstance.post(`/orders/${userId}`, payload);
};

export const getOrdersByUserId = (userId) => {
  return axiosInstance.get(`/orders/users/${userId}`);
};