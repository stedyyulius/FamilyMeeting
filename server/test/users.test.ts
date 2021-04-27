import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../app';

describe('family api', () => {

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => {
                done();
                app.close();
            })
        });
    });

    test('user able to register', async (done) => {

        const newUser = {
            name: 'Pudra',
            birthdate: new Date()
        };

        const registeredUser = await supertest(app)
        .post('/users/register')
        .send(newUser)
        .expect(200);

        const savedUser = await supertest(app)
        .get(`/users?_id=${registeredUser.body._id}`)
        .expect(200);

        expect(savedUser.body.length).toEqual(1);

        app.close(); 
        done();
    });
    
    test('able to get all users', async (done) => {

        const allFamilies = await supertest(app)
        .get('/users')
        .expect(200);

        expect(allFamilies.body.length).toBe(1);
 
         app.close(); 
         done();
     });

})