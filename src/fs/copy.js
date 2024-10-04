import { access, constants, mkdir, cp } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const COPY_FOLDER_NAME = 'files_copy';
const FILES_FOLDER_NAME = 'files';
const ERROR_MESSAGE = 'FS operation failed';

const checkIsSourceFolderExist = async (directory) => {
    try {
        await access(directory, constants.F_OK);
        return true;
    } catch (error) {
        console.log('Error:', ERROR_MESSAGE);
        return false;
    }
}

const copy = async () => {
    const filesFolder = join(__dirname, FILES_FOLDER_NAME);
    const copyFilesFolder = join(__dirname, COPY_FOLDER_NAME);
    const isSourceFolderExist = await checkIsSourceFolderExist(filesFolder);

    if(!isSourceFolderExist) {
        return;
    }

    try {
        await mkdir(copyFilesFolder);
        await cp(filesFolder, copyFilesFolder, { recursive: true });
    } catch (error) {
        console.log('Error:', ERROR_MESSAGE);
        return;
    }
};

await copy();
