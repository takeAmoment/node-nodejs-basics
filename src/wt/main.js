import { cpus } from 'os';
import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { exit } from 'process';

import { COMMON_ERROR_MESSAGE } from '../variables/common.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const START_WORKER_DATE_VALUE = 10;
const WORKER_FILE_NAME = 'worker.js';

const performCalculations = async () => {
    const workerFilePath = join(__dirname, WORKER_FILE_NAME);
    const cpusAmount = cpus().length;
    const array =  new Array(cpusAmount).fill(1);
    const promisesArray = [];

    array.forEach((_, index) => {
        const worker = new Worker(workerFilePath);

        let promise = new Promise((resolve, reject) => {
            worker.postMessage(START_WORKER_DATE_VALUE + index);
            worker.on('message', (data) => resolve(data));
            worker.on('error', () => reject(COMMON_ERROR_MESSAGE));
        });

        promisesArray.push(promise);
    });

    Promise.allSettled(promisesArray)
    .then((results) => {
       const arr = results.map((res) => {
        if (res.status ==='fulfilled') {
            return {
                status: "resolved",
                data: res.value
            }
        } else {
            return {
                status: "error",
                data: null
            }
        }
       });
       console.log('Result:', arr);
       exit(1);
    }).catch(() => console.log(COMMON_ERROR_MESSAGE));
};

await performCalculations();