import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toUserResponse, type CreateUserRequest, type LoginUserRequest, type UserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
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

    static async login (request: LoginUserRequest): Promise<UserResponse> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        // Cek database jika user ada
        let user = await prismaClient.user.findUnique({
            where: {
                username: loginRequest.username
            }
        });

        if(!user) {
            throw new ResponseError(401, 'Username or password incorrect');
        }

        // Cek jika password valid
        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
        if(!isPasswordValid) {
            throw new ResponseError(401, 'Username or password incorrect');
        }

        // Jika password valid, ubah data token
        user = await prismaClient.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        });

        const response = toUserResponse(user);
        response.token = user.token!;
        
        return response;
    }

}