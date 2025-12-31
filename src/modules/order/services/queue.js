import { Queue } from 'bullmq';

export const orderQueue = new Queue('orderQueue', { connection: { host: 'localhost', port: 3003 } });

