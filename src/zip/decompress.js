import { createReadStream, createWriteStream } from 'fs';
import { pipeline  } from 'stream';
import { createUnzip } from 'zlib';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE, FILE_TO_COMPRESS_NAME, ARCHIVED_FILE_NAME } from '../variables/common.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const decompress = async () => {
    const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_TO_COMPRESS_NAME);
    const archivedFile = join(__dirname, FILES_FOLDER_NAME, ARCHIVED_FILE_NAME);

    const readableStream = createReadStream(archivedFile);
    const writableStream = createWriteStream(fileName);
    const gzip = createUnzip();

    pipeline(readableStream, gzip, writableStream, (error) => {
        if(error) {
            console.log(COMMON_ERROR_MESSAGE);
        }
    });
};

await decompress();