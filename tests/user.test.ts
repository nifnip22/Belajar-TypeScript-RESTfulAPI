import { describe, it, expect, afterEach, beforeEach } from 'bun:test';
import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTest } from './test-util';
import bcrypt from 'bcrypt';

describe('POST /api/users', () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	// Jika register user error
	it('should reject register new user if request is invalid', async () => {
		const response = await supertest(web).post('/api/users').send({
			username: '',
			password: '',
			name: '',
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	// Jika register user berhasil
	it('should register new user', async () => {
		const response = await supertest(web).post('/api/users').send({
			username: 'test',
			password: 'test',
			name: 'test',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe('test');
		expect(response.body.data.name).toBe('test');
	});
});

describe('POST /api/users/login', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	// Jika berhasil login
	it('should be able to login', async () => {
		const response = await supertest(web).post('/api/users/login').send({
			username: 'test',
			password: 'test',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe('test');
		expect(response.body.data.name).toBe('test');
		expect(response.body.data.token).toBeDefined();
	});

	// Jika login gagal
	it('should reject login user if username is invalid', async () => {
		const response = await supertest(web).post('/api/users/login').send({
			username: 'salah',
			password: 'test',
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe('GET /api/users/current', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	// Jika berhasil mendapatkan user
	it('should be able to get current user', async () => {
		const response = await supertest(web).get('/api/users/current').set('X-API-TOKEN', 'test');

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.username).toBe('test');
		expect(response.body.data.name).toBe('test');
	});

	// Jika gagal mendapatkan user
	it('should reject get user if token is invalid', async () => {
		const response = await supertest(web).get('/api/users/current').set('X-API-TOKEN', 'salah');

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});
});

describe('PATCH /api/users/current', () => {
	beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

	// Jika update user gagal
	it('should reject update user if request is invalid', async () => {
		const response = await supertest(web).patch('/api/users/current').set('X-API-TOKEN', 'test').send({
			password: '',
			name: '',
		});

		logger.debug(response.body);
		expect(response.status).toBe(400);
		expect(response.body.errors).toBeDefined();
	});

	it('should reject update user if token is invalid', async () => {
		const response = await supertest(web).patch('/api/users/current').set('X-API-TOKEN', 'salah').send({
			password: 'rahasia321',
			name: 'Dheril Seven Justiand',
		});

		logger.debug(response.body);
		expect(response.status).toBe(401);
		expect(response.body.errors).toBeDefined();
	});

    // Jika update user berhasil
    it('should be able to update only user "name"', async () => {
		const response = await supertest(web).patch('/api/users/current').set('X-API-TOKEN', 'test').send({
			name: 'Zharif Aziz Zulkarnain',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		expect(response.body.data.name).toBe('Zharif Aziz Zulkarnain');
	});

    it('should be able to update only user "password"', async () => {
		const response = await supertest(web).patch('/api/users/current').set('X-API-TOKEN', 'test').send({
			password: 'lancarjaya99',
		});

		logger.debug(response.body);
		expect(response.status).toBe(200);
		
        // Cek jika password berubah
        const user = await UserTest.get();
        expect(await bcrypt.compare('lancarjaya99', user.password)).toBe(true);
	});
});

describe('DELETE /api/users/current', () => {
    beforeEach(async () => {
		await UserTest.create();
	});

	afterEach(async () => {
		await UserTest.delete();
	});

    // Jika user berhasil logout
    it('should be able to logout', async () => {
        const response = await supertest(web).delete('/api/users/current').set('X-API-TOKEN', 'test');

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe('Successfully logged out');

        // Cek jika data token nya hilang
        const user = await UserTest.get();
        expect(user.token).toBeNull();
    });

    // Jika user gagal logout
    it('should reject user logout if token is invalid', async () => {
        const response = await supertest(web).delete('/api/users/current').set('X-API-TOKEN', 'salah');

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});
