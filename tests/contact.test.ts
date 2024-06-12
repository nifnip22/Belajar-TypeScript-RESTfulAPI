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
            phone: '081234567890'
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
            phone: '0812345678901234567890'
        });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

});