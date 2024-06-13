import type { Contact, User } from "@prisma/client";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { toContactResponse, type ContactResponse, type CreateContactRequest, type UpdateContactRequest } from "../model/contact-model";
import { ResponseError } from "../error/response-error";

export class ContactService {

    static async create(user: User, request: CreateContactRequest): Promise<ContactResponse> {
        const createRequest = Validation.validate(ContactValidation.CREATE, request);

        // Mendapatkan data username dari users
        const record = {
            first_name: createRequest.first_name,
            last_name: createRequest.last_name || null,
            email: createRequest.email || null,
            phone: createRequest.phone || null,
            username: user.username
        }

        const contact = await prismaClient.contact.create({
            data: record
        });

        return toContactResponse(contact);
    }

    static async checkContactMustExists(username: string, contactId: number): Promise<Contact> {
        const contact = await prismaClient.contact.findFirst({
            where: {
                id: contactId,
                username: username
            }
        });

        // Cek jika contact ada
        if (!contact) {
            throw new ResponseError(404, 'Contact is not found');
        }

        return contact;
    }

    static async get(user: User, id: number): Promise<ContactResponse> {
        const contact = await this.checkContactMustExists(user.username, id);

        return toContactResponse(contact);
    }

    static async update(user: User, request: UpdateContactRequest): Promise<ContactResponse> {
        const updateRequest = Validation.validate(ContactValidation.UPDATE, request);
        await this.checkContactMustExists(user.username, updateRequest.id);

        const contact = await prismaClient.contact.update({
            where: {
                id: updateRequest.id,
                username: user.username,
            },
            data: updateRequest
        });

        return toContactResponse(contact);
    }

    static async remove(user: User, id: number): Promise<ContactResponse> {
        await this.checkContactMustExists(user.username, id);

        const contact = await prismaClient.contact.delete({
            where: {
                id: id,
                username: user.username
            }
        });

        return toContactResponse(contact);
    }

}