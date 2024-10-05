import { createReadStream } from 'fs'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stdout } from 'process';

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE } from '../variables/common.js';

const FILE_NAME = 'fileToRead.txt';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
let result = '';

const read = async () => {
  const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_NAME);

  const readableStream = createReadStream(fileName, { encoding: "utf-8"});

  readableStream.on('error', (error) => console.log(COMMON_ERROR_MESSAGE, error));
  readableStream.on('data', (data) => result += data);
  readableStream.on('end', () => {
    if(result) {
      stdout.write(`Result: ${result}\n`);
    }
  });
};

await read();