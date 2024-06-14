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

describe('GET /api/contacts/:contactId/addresses/:addressId', async () => {

    beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
        await AddressTest.create();
	});

	afterEach(async () => {
        await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});
    
    // Jika get address berhasil
    it('should be able to get address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).get(`/api/contacts/${contact.id}/addresses/${address.id}`).set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe(address.street);
        expect(response.body.data.city).toBe(address.city);
        expect(response.body.data.province).toBe(address.province);
        expect(response.body.data.country).toBe(address.country);
        expect(response.body.data.postal_code).toBe(address.postal_code);
    });

    // Jika get address gagal
    it('should reject get address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`).set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject get address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`).set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
    
});

describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {

    beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
        await AddressTest.create();
	});

	afterEach(async () => {
        await AddressTest.deleteAll();
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

    // Jika update address berhasil
    it('should be able to update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id}`).set('X-API-TOKEN', 'test').send({
            street: 'Jl. Pattimura',
            city: 'Balikpapan',
            province: 'Kalimantan Timur',
            country: 'Indonesia',
            postal_code: '76126'
        });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe('Jl. Pattimura');
        expect(response.body.data.city).toBe('Balikpapan');
        expect(response.body.data.province).toBe('Kalimantan Timur');
        expect(response.body.data.country).toBe('Indonesia');
        expect(response.body.data.postal_code).toBe('76126');
    });

    // Jika update address gagal
    it('should reject update address if request is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id}`).set('X-API-TOKEN', 'test').send({
            street: 'Jl. Pattimura',
            city: 'Balikpapan',
            province: 'Kalimantan Timur',
            country: '',
            postal_code: ''
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update address if address is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`).set('X-API-TOKEN', 'test').send({
            street: 'Jl. Pattimura',
            city: 'Balikpapan',
            province: 'Kalimantan Timur',
            country: 'Indonesia',
            postal_code: '76126'
        });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update address if contact is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web).put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`).set('X-API-TOKEN', 'test').send({
            street: 'Jl. Pattimura',
            city: 'Balikpapan',
            province: 'Kalimantan Timur',
            country: 'Indonesia',
            postal_code: '76126'
        });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

});