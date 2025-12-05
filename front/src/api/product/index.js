import { axiosInstance } from "..";

export const getProduct = (id) =>  {
  return axiosInstance.get(`/goods/${id}`);
}
