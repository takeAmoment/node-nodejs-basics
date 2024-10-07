import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { checkIsExist } from '../helpers/checkIsExist.js';
import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';

const FILE_TO_READ_NAME = 'fileToRead.txt';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const read = async () => {
    const filePath = join(__dirname, FILES_FOLDER_NAME, FILE_TO_READ_NAME);
    const isFileExist = await checkIsExist(filePath);

    if(!isFileExist) {
        throw new Error(ERROR_MESSAGE);
    }

    try {
        const fileContent = await readFile(filePath, 'utf8');
        console.log('File content:', fileContent);
    } catch (error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await read();