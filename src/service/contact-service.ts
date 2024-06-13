import type { Contact, User } from "@prisma/client";
import { ContactValidation } from "../validation/contact-validation";
import { Validation } from "../validation/validation";
import { prismaClient } from "../application/database";
import { toContactResponse, type ContactResponse, type CreateContactRequest, type SearchContactRequest, type UpdateContactRequest } from "../model/contact-model";
import { ResponseError } from "../error/response-error";
import type { Pageable } from "../model/page";

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

    static async search(user: User, request: SearchContactRequest) : Promise<Pageable<ContactResponse>> {
        const searchRequest = Validation.validate(ContactValidation.SEARCH, request);
        const skip = (searchRequest.page - 1) * searchRequest.size;

        const filters = [];

        // Cek jika name ada
        if (searchRequest.name) {
            filters.push({
                OR: [
                    {
                        first_name: {
                            contains: searchRequest.name
                        }
                    },
                    {
                        last_name: {
                            contains: searchRequest.name
                        }
                    }
                ]
            });
        }

        // Cek jika email ada
        if(searchRequest.email) {
            filters.push({
                email: {
                    contains: searchRequest.email
                }
            });
        }

        // Cek jika phone ada
        if(searchRequest.phone) {
            filters.push({
                phone: {
                    contains: searchRequest.phone
                }
            });
        }

        const contacts = await prismaClient.contact.findMany({
            where: {
                username: user.username,
                AND: filters
            },
            take: searchRequest.size,
            skip: skip
        });

        const total = await prismaClient.contact.count({
            where: {
                username: user.username,
                AND: filters
            }
        });

        return {
            data: contacts.map(contact => toContactResponse(contact)),
            paging: {
                current_page: searchRequest.page,
                total_page: Math.ceil(total / searchRequest.size),
                size: searchRequest.size
            }
        }
    }

}