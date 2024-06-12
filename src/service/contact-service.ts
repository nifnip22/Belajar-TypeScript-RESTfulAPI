import type { User } from "@prisma/client";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { toContactResponse, type ContactResponse, type CreateContactRequest } from "../model/contact-model";

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

}