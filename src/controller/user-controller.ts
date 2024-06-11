import type { Request, Response, NextFunction } from "express";
import type { CreateUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";

// Controller untuk User
export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body as CreateUserRequest;
            const response = await UserService.register(request);
            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

}