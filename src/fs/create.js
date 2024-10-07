import { writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';
import { checkIsExist } from '../helpers/checkIsExist.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const content = 'I am fresh and young';
const FILE_NAME = 'fresh.txt';

const create = async () => {
    const filePath = join(__dirname, FILES_FOLDER_NAME, FILE_NAME);

    const isFileExist = await checkIsExist(filePath);

    if(isFileExist) {
        throw new Error(ERROR_MESSAGE);
    }

    try {
        await writeFile(filePath, content);
    } catch (err) {
        throw new Error(ERROR_MESSAGE);
    }
};

await create();