import mongoose from 'mongoose';
import supertest from 'supertest';

import app from '../app';

import Users from '../models/users';
import Family from '../models/family';

interface userType {
    _id: string,
    name: string,
    email: string,
    password: string
}

describe('meeting api', () => {

    let auth: string;
    let loginedUser: userType;


    beforeAll(async (done) => {
        const newUser = await Users.create({ name: 'Pureo', email: 'pureo@gmail.com', password: 'puwawa' });
        const token = await supertest(app).post('/users/login').send(newUser).toString() as string;

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

    test('user able to create meeting', async (done) => {

        const newFamily = await Family.create({
            name: 'Udra',
            members: [loginedUser._id]
        })

        const meetingName = "The Farm";

        const newMeeting = {
            name: meetingName,
            date: new Date(),
            participants: [loginedUser._id],
            familyId: newFamily._id,
        }

        await supertest(app)
        .post('/meetings')
        .set('authorization', auth)
        .send(newMeeting)
        .expect(200);

        const createdMeeting = await supertest(app).get(`/meetings?name=${meetingName}&participants=${loginedUser._id}&familyId=${newFamily._id}`);

        expect(createdMeeting.body.length).toBe(1);

        app.close();
        done();
        
    })


})