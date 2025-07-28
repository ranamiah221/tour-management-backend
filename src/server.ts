/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';
import { redisConnect } from './app/config/redis.config';

let server: Server;


const serverStart = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)
        console.log('Connected to DB');
        server = app.listen(envVars.PORT, () => {
            console.log(`Server running on ${envVars.PORT}`)
        })
    }
    catch (error) {
        console.log(error);
    }

}

(async () => {
    await redisConnect()
    await serverStart();
    await seedSuperAdmin();
})()


// handle server error
process.on('unhandledRejection', (err) => {
    console.log('Unhandled Rejection detected...Server shutting down.', err);
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on('uncaughtException', (err) => {
    console.log('Unhandled uncaughtException detected...Server shutting down.', err);
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on('SIGTERM', () => {
    console.log('Unhandled SIGTERM detected...Server shutting down.');
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on('SIGINT', () => {
    console.log('Unhandled SIGINT detected...Server shutting down.');
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})


// handled----> unhandledRejection
// Promise.reject(new Error("Forget promiss handling"))

// handled----> uncaughtException
// throw new Error("Forget local error handling")