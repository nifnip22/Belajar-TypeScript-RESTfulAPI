import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { UserTest, ContactTest, AddressTest } from './test-util';
import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';

describe('POST /api/contacts/:contactId/addresses', () => {

    beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
        await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

    // Jika create address berhasil
    it('should be able to create a new address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web).post(`/api/contacts/${contact.id}/addresses`).set('X-API-TOKEN', 'test').send({
            street: 'Street',
            city: 'City',
            province: 'Province',
            country: 'Country',
            postal_code: '12345'
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe('Street');
        expect(response.body.data.city).toBe('City');
        expect(response.body.data.province).toBe('Province');
        expect(response.body.data.country).toBe('Country');
        expect(response.body.data.postal_code).toBe('12345');
    });

    // Jika create address gagal
    it('should reject create a new address if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web).post(`/api/contacts/${contact.id}/addresses`).set('X-API-TOKEN', 'test').send({
            street: 'Street',
            city: 'City',
            province: 'Province',
            country: '',
            postal_code: ''
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject create a new address if contact is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web).post(`/api/contacts/${contact.id + 1}/addresses`).set('X-API-TOKEN', 'test').send({
            street: 'Street',
            city: 'City',
            province: 'Province',
            country: 'Country',
            postal_code: '12345'
        });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

});