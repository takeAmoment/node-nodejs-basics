import { mkdir, cp } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { checkIsExist } from '../helpers/checkIsExist.js';
import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const COPY_FOLDER_NAME = 'files_copy';

const copy = async () => {
    const filesFolder = join(__dirname, FILES_FOLDER_NAME);
    const copyFilesFolder = join(__dirname, COPY_FOLDER_NAME);
    const isSourceFolderExist = await checkIsExist(filesFolder);

    if(!isSourceFolderExist) {
        throw new Error(ERROR_MESSAGE);
    }

    try {
        await mkdir(copyFilesFolder);
        await cp(filesFolder, copyFilesFolder, { recursive: true });
    } catch (error) {
        throw new Error(ERROR_MESSAGE);
    }
};

await copy();
