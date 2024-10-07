import { createReadStream } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

import { FILES_FOLDER_NAME, COMMON_ERROR_MESSAGE } from '../variables/common.js'

const FILE_NAME = 'fileToCalculateHashFor.txt'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const calculateHash = async () => {
  const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_NAME)

  const hash = createHash('sha256');
  const readableStream = createReadStream(fileName);

  readableStream.on('error', () => {
    throw new Error(COMMON_ERROR_MESSAGE);
  });
  readableStream.on('data', (data) => hash.update(data));
  readableStream.on('end', () => console.log('Hash is', hash.digest('hex')));
}

await calculateHash()
