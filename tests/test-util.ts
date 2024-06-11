import { prismaClient } from "../src/application/database";

export class UserTest {
    
    // Proses untuk menghapus data user yang jika dalam unit test ada user yang ditambahkan dengan nama 'test' sebagai uji percobaan
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                username: "test"
            }
        });
    }

}