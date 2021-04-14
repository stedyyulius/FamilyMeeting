import express from 'express';

import userRouter from './routes/users';
import meetingRouter from './routes/meetings';
import familyRouter from './routes/family';

import mongoose  from 'mongoose';

import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const connectMongo = async () => {
try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hshi4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    });

    console.log('mongodb connected');

    } catch (error) {
        console.log(error)
    }
}

connectMongo();

const app = express();

app.use('/users', userRouter);
app.use('/meetings', meetingRouter);
app.use('/family', familyRouter);

const port = 3003

app.listen(port, () => {
    console.log(`server listen to ${port}`)
});
