import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../app';

describe('family api', () => {

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => {
                app.close();
                done();
            })
        });
    });

    const newUser = {
        name: 'Pudra',
        password: 'puwwa',
        birthdate: new Date()
    };

    let auth = '';

    test('user able to register', async (done) => {

        await supertest(app)
        .post('/users/register')
        .send(newUser)
        .expect(200);

        app.close(); 
        done();
    });

    test('user able to login', async (done) => {

        const loginResponse = await supertest(app)
        .post(`/users/login`)
        .send(newUser)
        .expect(200);

        const token = loginResponse.text;

        auth = token;

        expect(token.length > 20).toEqual(true);

        app.close(); 
        done();
    });
    
    test('able to get all users', async (done) => {

        const allFamilies = await supertest(app)
        .get('/users')
        .set('authorization', auth)
        .expect(200);

        expect(allFamilies.body.length).toBe(1);
 
         app.close(); 
         done();
     });

})