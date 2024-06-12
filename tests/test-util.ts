import type { Contact, User } from "@prisma/client";
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

    // Proses mengecek data user
    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                username: "test",
            }
        });

        if (!user) {
            throw new Error('404 user is not found');
        }

        return user;
    }

}

export class ContactTest {

    // Proses menghapus data contact jika unit test selesai di jalankan
    static async deleteAll() {
        await prismaClient.contact.deleteMany({
            where: {
                username: "test",
            }
        });
    }

    // Proses untuk menyimpan satu data contact
    static async create() {
        await prismaClient.contact.create({
            data: {
                first_name: "test",
                last_name: "test",
                email: "test@example.com",
                phone: "081234567890",
                username: "test",
            }
        });
    }

    // Proses untuk mendapatkan id contact
    static async get(): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                username: "test",
            }
        });

        if (!contact) {
            throw new Error('404 contact is not found');
        }

        return contact;
    }

}