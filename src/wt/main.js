import { Worker, workerData, parentPort } from 'worker_threads';
import os from 'os';
import path from 'path';

const performCalculations = async () => {
    const numWorkers = os.cpus().length;

    const workerPromises = Array.from({ length: numWorkers }, (_, index) => {
        const worker = new Worker(path.resolve(path.dirname(new URL(import.meta.url).pathname), 'worker.js'), { workerData: index + 10 });

        return new Promise((resolve) => {
            worker.on('message', (message) => {
                resolve(message);
            });
        });
    });

    const results = await Promise.all(workerPromises);

    console.log(results);
};

await performCalculations();
