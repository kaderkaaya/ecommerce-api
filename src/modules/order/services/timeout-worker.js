import { Worker } from 'bullmq';
import OrderService from './order.js';
const worker = new Worker(
    'orderQueue',
    async (job) => {
        const { orderId } = job.data;

        await OrderService.cancelIfNotPaid({ orderId });
    },
    {
        connection: { host: 'localhost', port: 3003 }
    }
);
