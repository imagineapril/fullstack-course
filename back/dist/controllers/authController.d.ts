import { type Request, Response } from "express";
import { CustomRequets } from "../types/common";
import { CreateUserPayload } from "./create-user";
import { IUser } from "../types/user";
import { LoginUserPayload } from "./loginController";
export declare class authController {
    static registration(request: CustomRequets<CreateUserPayload>, response: Response<Pick<IUser, 'id'>>): Promise<void>;
    static login(request: CustomRequets<LoginUserPayload>, response: Response): Promise<void>;
    static logout(request: Request, response: Response): Promise<void>;
    static refresh(request: Request, response: Response): Promise<void>;
}
//# sourceMappingURL=authController.d.ts.map