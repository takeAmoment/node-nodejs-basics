import { parentPort } from 'worker_threads';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

// n should be received from main thread
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {

    parentPort.on('message', (data) => {
        const result = nthFibonacci(data);
        parentPort.postMessage(result);
    });
};

sendResult();