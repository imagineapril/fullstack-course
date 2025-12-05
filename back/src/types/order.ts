import type * as core from 'express-serve-static-core';

export interface IUserIdParam extends core.ParamsDictionary {
  userId: string;
}

export interface IOrderIdParam extends core.ParamsDictionary {
  orderId: string;
}

export interface IOrderErrors {
  emptyAddress?: string;
  emptyPhoneNumber?: string;
  empryProducts?: string;
}

export interface IOrder {
  id: number;
  phone_number: string;
  address: string;
  created: string;
  user_id: number;
}