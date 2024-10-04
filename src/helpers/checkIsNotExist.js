import { constants, access } from 'fs/promises';
import { ERROR_MESSAGE } from '../variables/common.js';

export const checkIsNotExist = async (directory) => {

  try {
      await access(directory, constants.F_OK);
      console.log('Error:', ERROR_MESSAGE);
      return false;
  } catch (error) {
      return true;
  }
}