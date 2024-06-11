import type { User } from "@prisma/client";

// Model User untuk memproses request dan response
export type UserResponse = {
    username: string;
    name: string;
    token?: string;
}

export type CreateUserRequest = {
    username: string;
    name: string;
    password: string;
}

export function toUserResponse(user: User): UserResponse {
    return {
        username: user.username,
        name: user.name,
    }
}