import type { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import { ResponseError } from "../error/response-error";
import { toUserResponse, type CreateUserRequest, type LoginUserRequest, type UpdateUserRequest, type UserResponse } from "../model/user-model";
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

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        // Cek jika yang diupdate adalah name
        if (updateRequest.name) {
            user.name = updateRequest.name;
        }

        // Cek jika yang diupdate adalah password
        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        // Proses update
        const result = await prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: user
        });

        return toUserResponse(result);
    }

    static async logout(user: User): Promise<UserResponse> {
        const result = await prismaClient.user.update({
            where: {
                username: user.username,
            },
            data: {
                token: null
            }
        });

        return toUserResponse(result);
    }

}