import { rm } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js';
import { checkIsExist } from '../helpers/checkIsExist.js';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

const FILE_TO_REMOVE_NAME = 'fileToRemove.txt';

const remove = async () => {
  const filePath = join(__dirname, FILES_FOLDER_NAME, FILE_TO_REMOVE_NAME);

  const isFileExist = await checkIsExist(filePath);

  if(!isFileExist) {
    return;
  }

  try {
    await rm(filePath);
  } catch (error) {
    console.log('Error:', ERROR_MESSAGE);
  }
};

await remove();