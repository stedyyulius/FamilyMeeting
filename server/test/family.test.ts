import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../app';

import Users from '../models/users';

describe('family api', () => {

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => {
                done();
            })
        });
    });

    test('able to create family successfully', async (done) => {

        const newFamily = {
            name: 'udra',
        };

        const createdFamily = await supertest(app)
        .post('/family')
        .send(newFamily)
        .expect(200);

        const savedFamily = await supertest(app)
        .get(`/family?_id=${createdFamily.body._id}`)
        .expect(200);

        expect(savedFamily.body.length).toEqual(1);

        app.close(); 
        done();
    });

    test('able to create family with a member', async (done) => {

        const newUser = await Users.create({
            name: 'Pureo'
        })

        const newFamily = {
            name: 'ocip',
            members: [newUser.id]
        };

        await supertest(app)
        .post('/family')
        .send(newFamily)
        .expect(200);

        const savedFamilyMember = await supertest(app)
        .get(`/family?members=${newUser._id}`)
        .expect(200);

        expect(savedFamilyMember.body.length).toEqual(1);

        app.close(); 
        done();
    });

    test('user able to join family', async (done) => {

        const newUser = await Users.create({
            name: 'Belang'
        })

        const savedFamily = await supertest(app)
        .get(`/family?name=udra`)
        .expect(200);

        expect(savedFamily.body.length).toEqual(1);

        const testFamily = savedFamily.body[0];

        const memberJoined = {
            ...testFamily,
            members: [...testFamily.members, newUser._id]
        }

        await supertest(app)
        .put(`/family/${testFamily._id}`)
        .send(memberJoined)
        .expect(200);

        const savedFamilyMember = await supertest(app)
        .get(`/family?members=${newUser._id}`)
        .expect(200);

        expect(savedFamilyMember.body.length).toEqual(1);

        app.close(); 
        done();
    });

    
    test('able to get all families successfully', async (done) => {

        const allFamilies = await supertest(app)
        .get('/family/all')
        .expect(200);

        expect(allFamilies.body.length).toBe(2);
 
         app.close(); 
         done();
     });

})