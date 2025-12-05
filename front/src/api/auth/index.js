import { axiosInstance } from "..";

export const registration = (email, password) => {
  return axiosInstance.post('/auth/registration', {
    email: email,
    password: password
  });
};

export const login = (email, password) =>  {
  return axiosInstance.post('/auth/login', {
    email: email,
    password: password
  });
}


