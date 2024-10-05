import { readdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { checkIsExist } from '../helpers/checkIsExist.js';
import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const list = async () => {
    const folderPath = join(__dirname, FILES_FOLDER_NAME);
    const isFolderExist = await checkIsExist(folderPath);

    if(!isFolderExist){
        return;
    }

    try {
       const files = await readdir(folderPath);
       console.log('Files array:', files);
    } catch (error) {
        console.log('Error:', ERROR_MESSAGE);
    }
};

await list();