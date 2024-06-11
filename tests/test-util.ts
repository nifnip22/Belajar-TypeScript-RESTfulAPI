import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

export class UserTest {
    
    // Proses untuk menghapus data user yang jika dalam unit test ada user yang ditambahkan dengan nama 'test' sebagai uji percobaan
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    }

    // Proses untuk menyimpan data user sebelum melakukan proses test login
    static async create() {
        await prismaClient.user.create({
            data: {
                username: "test",
                name: "test",
                password: await bcrypt.hash('test', 10),
                token: "test",
            }
        });
    }

}