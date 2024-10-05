import { createWriteStream } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stdin } from 'process';

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE } from '../variables/common.js';

const FILE_NAME = 'fileToWrite.txt';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const write = async () => {
    const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_NAME);

    const writableStream = createWriteStream(fileName);

    stdin.on('data', (data) => {
        if(data) {
            writableStream.write(data);
        }
    });

    stdin.on('error', () => console.log(COMMON_ERROR_MESSAGE));
    writableStream.on('error', () => console.log(COMMON_ERROR_MESSAGE));
};

await write();