import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import { ContactTest, UserTest } from './test-util';
import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';

describe('POST /api/contacts', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	// Jika create contact berhasil
	it('should create new contact', async () => {
		const response = await supertest(web).post('/api/contacts').set('X-API-TOKEN', 'test').send({
			first_name: 'Hanif',
			last_name: 'Ahmad',
			email: 'hanif22ahmad@gmail.com',
			phone: '081234567890',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe('Hanif');
		expect(response.body.data.last_name).toBe('Ahmad');
		expect(response.body.data.email).toBe('hanif22ahmad@gmail.com');
		expect(response.body.data.phone).toBe('081234567890');
	});

	// Jika create contact gagal
	it('should reject create new contact if data is invalid', async () => {
		const response = await supertest(web).post('/api/contacts').set('X-API-TOKEN', 'test').send({
			first_name: '',
			last_name: '',
			email: 'hanif22ahmad',
			phone: '0812345678901234567890',
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe('GET /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	// Jika berhasil mendapatkan contact
	it('should be able to get contact', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web).get(`/api/contacts/${contact.id}`).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.first_name).toBe(contact.first_name);
		expect(response.body.data.last_name).toBe(contact.last_name);
		expect(response.body.data.email).toBe(contact.email);
		expect(response.body.data.phone).toBe(contact.phone);
	});

	// Jika gagal mendapatkan contact
	it('should reject get contact if is not found or the id is invalid', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.get(`/api/contacts/${contact.id + 1}`)
			.set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe('PUT /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	// Jika update contact berhasil
	it('should be able to update contact', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web).put(`/api/contacts/${contact.id}`).set('X-API-TOKEN', 'test').send({
			first_name: 'Hanif',
			last_name: 'Ahmad',
			email: 'nifnip22@example.com',
			phone: '0821',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.id).toBe(contact.id);
		expect(response.body.data.first_name).toBe('Hanif');
		expect(response.body.data.last_name).toBe('Ahmad');
		expect(response.body.data.email).toBe('nifnip22@example.com');
		expect(response.body.data.phone).toBe('0821');
	});

	// Jika update contact gagal
	it('should reject update contact if request is invalid', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web).put(`/api/contacts/${contact.id}`).set('X-API-TOKEN', 'test').send({
			first_name: '',
			last_name: '',
			email: 'nifnip22',
			phone: '',
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});
});

describe('DELETE /api/contacts/:contactId', () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	// Jika remove contact berhasil
	it('should be able to remove contact', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web).delete(`/api/contacts/${contact.id}`).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data).toBe('Contact removed successfully');
	});

	// Jika remove contact gagal
	it('should reject remove contact if contact is not found', async () => {
		const contact = await ContactTest.get();
		const response = await supertest(web)
			.delete(`/api/contacts/${contact.id + 1}`)
			.set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(404);
		expect(response.body.errors).toBeDefined();
	});
});

describe('GET /api/contacts', () => {
	beforeEach(async () => {
		await UserTest.create();
		await ContactTest.create();
	});

	afterEach(async () => {
		await ContactTest.deleteAll();
		await UserTest.delete();
	});

	// Jika belum melakukan pencarian contact dengan salah satu query
	it('should be able to search contact', async () => {
		const response = await supertest(web).get('/api/contacts').set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	// Jika melakukan pencarian contact hanya dengan query name
	it('should be able to search contact using name', async () => {
		const response = await supertest(web).get('/api/contacts').query({ name: 'es' }).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	// Jika melakukan pencarian contact hanya dengan query email
	it('should be able to search contact using email', async () => {
		const response = await supertest(web).get('/api/contacts').query({ email: '.com' }).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	// Jika melakukan pencarian contact hanya dengan query phone
	it('should be able to search contact using phone', async () => {
		const response = await supertest(web).get('/api/contacts').query({ phone: '6789' }).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(1);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(10);
	});

	// Jika melakukan pencarian dan hasilnya tidak ada datanya
	it('should be able to search contact no result', async () => {
		const response = await supertest(web).get('/api/contacts').query({ name: 'salah' }).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.paging.current_page).toBe(1);
		expect(response.body.paging.total_page).toBe(0);
		expect(response.body.paging.size).toBe(10);
	});

	// Jika melakukan pencarian dengan paging
	it('should be able to search contact no result', async () => {
		const response = await supertest(web).get('/api/contacts').query({ page: 2, size: 1 }).set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.length).toBe(0);
		expect(response.body.paging.current_page).toBe(2);
		expect(response.body.paging.total_page).toBe(1);
		expect(response.body.paging.size).toBe(1);
	});
});
