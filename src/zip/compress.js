import { createReadStream, createWriteStream } from 'fs';
import { pipeline  } from 'stream';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE } from '../variables/common.js';

const FILE_NAME = 'fileToCompress.txt';
const ARCHIVE_FILE_NAME = 'fileToCompress.txt.gz'

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const compress = async () => {
    const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_NAME);
    const archivedFile = join(__dirname, FILES_FOLDER_NAME, ARCHIVE_FILE_NAME);

    const readableStream = createReadStream(fileName);
    const writableStream = createWriteStream(archivedFile);
    const gzip = createGzip();

    pipeline(readableStream, gzip, writableStream, (error) => {
        if(error) {
            console.log(COMMON_ERROR_MESSAGE);
        }
    });
};

await compress();