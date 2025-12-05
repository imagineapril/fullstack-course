import { axiosInstance } from "..";
import { stringifySearch } from "../../utils/stringifySearch";

export const getProducts = (page = '1', goodTitle="") =>  {
  const queryString = stringifySearch({ page: page, goodTitle: goodTitle })
  return axiosInstance.get(`/goods${queryString}`);
}