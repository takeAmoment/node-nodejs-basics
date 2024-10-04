import { constants, access } from 'fs/promises';
import { ERROR_MESSAGE } from '../variables/common.js';

export const checkIsExist = async (directory) => {

  try {
      await access(directory, constants.F_OK);
      return true;
  } catch (error) {
      console.log('Error:', ERROR_MESSAGE, error);
      return false;
  }
}