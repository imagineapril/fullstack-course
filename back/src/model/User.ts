import { IUser, UserRoles } from "../types/user";

export class User implements IUser {
  email: string;
  password: string;
  id: number | null;
  public_key: string;
  role?: UserRoles;

  constructor(params: IUser) {
    this.email = params.email;
    this.password = params.password;
    this.public_key = params.public_key;
    this.role = params.role ?? UserRoles.User;
    this.id = params?.id ?? null;
  }
}