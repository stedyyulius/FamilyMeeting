import express from 'express';
import mongoose  from 'mongoose';

import middleware from './middleware';

import userRouter from './routes/users';
import meetingRouter from './routes/meetings';
import familyRouter from './routes/family';


import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

const connectMongo = async () => {

try {

    if (process.env.NODE_ENV === 'test') {
        
        await mongoose.connect(`mongodb+srv://${process.env.DBTEST_USERNAME}:${process.env.DBTEST_PASSWORD}@cluster0.ytldw.mongodb.net/${process.env.DBTEST_DB_NAME}?retryWrites=true&w=majority`,
        { 
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

    } else {

        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hshi4.mongodb.net/${process.env.DB_DB_NAME}??retryWrites=true&w=majority`,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });
        
    }

    console.log('mongodb connected');

    } catch (error) {
        console.log(error)
    }
}

connectMongo();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middleware)

app.use('/users', userRouter);
app.use('/meetings', meetingRouter);
app.use('/family', familyRouter);

const port = 3003

const server = app.listen(port, () => {
    console.log(`server listen to ${port}`)
});

export default server;
