import mongoose from 'mongoose';
import sha256 from 'sha256';
import supertest from 'supertest';

import app from '../app';

import Users from '../models/users';

interface userType {
    _id: string,
    name: string,
    email: string,
    password: string
}

describe('family api', () => {

    let auth: any;
    let loginedUser: userType;


    beforeAll(async (done) => {
        const newUser = await Users.create({ name: 'Pureo', email: 'pureo@gmail.com', password: sha256('puwawa') });
        const token = await supertest(app).post('/users/login').set('Content-Type', 'application/json').send(newUser);
        console.log(token)
        loginedUser = newUser;
        auth = token;
        done();
        app.close();
    })

    afterAll((done) => {
        mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => {
                done();
                app.close();
            })
        });
    });

    test('able to create family successfully', async (done) => {

        const newFamily = {
            name: 'udra',
        };

        const createdFamily = await supertest(app)
        .post('/family')
        .set('authorization', auth)
        .send(newFamily)
        .expect(200);

        const savedFamily = await supertest(app)
        .get(`/family?_id=${createdFamily.body._id}`)
        .set('authorization', auth)
        .expect(200);

        expect(savedFamily.body.length).toEqual(1);

        app.close(); 
        done();
    });

    test('able to create family with a member', async (done) => {


        const newFamily = {
            name: 'ocip',
            members: [loginedUser._id]
        };

        await supertest(app)
        .post('/family')
        .set('authorization', auth)
        .send(newFamily)
        .expect(200);

        const savedFamilyMember = await supertest(app)
        .get(`/family?members=${loginedUser._id}`)
        .set('authorization', auth)
        .expect(200);

        expect(savedFamilyMember.body.length).toEqual(1);

        app.close(); 
        done();
    });

    test('user able to join family', async (done) => {


        const savedFamily = await supertest(app)
        .get(`/family?name=${loginedUser.name}`)
        .set('authorization', auth)
        .expect(200);

        expect(savedFamily.body.length).toEqual(1);

        const testFamily = savedFamily.body[0];

        const memberJoined = {
            ...testFamily,
            members: [...testFamily.members, loginedUser._id]
        }

        await supertest(app)
        .put(`/family/${testFamily._id}`)
        .set('authorization', auth)
        .send(memberJoined)
        .expect(200);

        const savedFamilyMember = await supertest(app)
        .get(`/family?members=${loginedUser._id}`)
        .set('authorization', auth)
        .expect(200);

        expect(savedFamilyMember.body.length).toEqual(1);

        app.close(); 
        done();
    });

    
    test('able to get all families successfully', async (done) => {

        const allFamilies = await supertest(app)
        .get('/family/all')
        .set('authorization', auth)
        .expect(200);

        expect(allFamilies.body.length).toBe(2);
 
         app.close(); 
         done();
     });

})