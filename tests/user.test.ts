import { describe, it, expect, afterEach } from 'bun:test'
import supertest from 'supertest';
import { web } from '../src/application/web';
import { logger } from '../src/application/logging';
import { UserTest } from './test-util';

describe('POST /api/users', () => {

    // Untuk menghapus data user yang jika dalam unit test ada user yang ditambahkan dengan nama 'test' sebagai uji percobaan
    afterEach(async () => {
        await UserTest.delete();
    });

    // Jika register user error
    it('should reject register new user if request is invalid', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "",
                password: "",
                name: "",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    // Jika register user berhasil
    it('should register new user', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                username: "test",
                password: "test",
                name: "test",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.username).toBe('test');
        expect(response.body.data.name).toBe('test');
    });

});