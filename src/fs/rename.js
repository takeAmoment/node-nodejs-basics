import fs from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { checkIsNotExist } from '../helpers/checkIsNotExist.js';
import { ERROR_MESSAGE } from '../variables/common.js';

const WRONG_FILE_NAME = 'wrongFilename.txt';
const PROPER_FILE_NAME = 'properFilename.md';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const rename = async () => {
    const wrongFilePath = join(__dirname, 'files', WRONG_FILE_NAME);
    const properFilePath = join(__dirname, 'files', PROPER_FILE_NAME);

    const isFileNotExist = await checkIsNotExist(properFilePath);

    if(!isFileNotExist) {
        return;
    }

    try {
      await fs.rename(wrongFilePath, properFilePath);
    } catch (error) {
        console.log('Error:', ERROR_MESSAGE);
    }
};

await rename();