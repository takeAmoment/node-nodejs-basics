import { constants, access } from 'fs/promises';


export const checkIsExist = async (directory) => {

  try {
      await access(directory, constants.F_OK);
      return true;
  } catch (error) {
      return false;
  }
};