import { Queue } from 'bullmq';
//burda redis kurulu olması lazım
//bunu baska bir projede yapacağım
export const orderQueue = new Queue('orderQueue', { connection: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT } });

