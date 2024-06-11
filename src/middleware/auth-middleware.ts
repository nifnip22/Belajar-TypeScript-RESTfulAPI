import type { Response, NextFunction } from "express";
import { prismaClient } from "../application/database";
import type { UserRequest } from "../type/user-request";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    
    // Mengambil data token
    const token = req.get('X-API-TOKEN');

    // Jika token ada
    if (token) {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            }
        });

        // Jika user ada
        if (user) {
            req.user = user;
            // Buat folder type di src untuk membuat request user pada express (karena request express di typescript berbeda dengan javascript)

            next();
            return;
        }
    }

    res.status(401).json({
        errors: "Unauthorized"
    }).end();
}