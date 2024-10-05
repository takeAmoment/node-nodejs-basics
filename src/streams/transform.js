import { pipeline, Transform } from 'stream'
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stdout, stdin } from 'process';

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE } from '../variables/common.js';

const FILE_TO_READ_NAME = 'fileToRead.txt';
const FILE_TO_WRITE_NAME = 'fileToWrite.txt';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

class ReverseDataTransform extends Transform {
    _transform(data, encoding, callback) {
        const reversedData = data.toString().split('').reverse().join('');
        this.push(reversedData);
        callback();
    }
}

const transform = async () => {
    const transformedData = new ReverseDataTransform();

    pipeline(stdin, transformedData, stdout, (error) => {
        if(error) {
            console.log('Error:', COMMON_ERROR_MESSAGE);
        }
    })
};

await transform();