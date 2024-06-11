import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toUserResponse, type CreateUserRequest, type UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";

// Service Model untuk bisnis logic User
export class UserService {

    static async register(request: CreateUserRequest): Promise<UserResponse> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        // Mengecek jika saat user registrasi menggunakan username yang sudah dibuat oleh user lainnya
        const totalUserWithSameUsername = await prismaClient.user.count({
            where: {
                username: registerRequest.username
            }
        });

        if(totalUserWithSameUsername != 0) {
            throw new ResponseError(400, "Username already in use");
        }

        // Mengubah password menggunakan bcrypt
        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        // Create user baru
        const user = await prismaClient.user.create({
            data: registerRequest
        });

        return toUserResponse(user);
    }
    
}