import { access, constants, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = 'I am fresh and young';
const successMessage = 'This file was created successfully';

const create = async () => {
    const filePath = join(__dirname, FILES_FOLDER_NAME, 'fresh.txt');
    
    try {
        await access(filePath, constants.F_OK);
        throw new Error(ERROR_MESSAGE);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(filePath, content);
            console.log(successMessage);
        } else {
            console.log('Error:', ERROR_MESSAGE);
        }
    }
};

await create();