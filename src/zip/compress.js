import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { createGzip } from 'zlib'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

import {
  FILES_FOLDER_NAME,
  COMMON_ERROR_MESSAGE,
  FILE_TO_COMPRESS_NAME,
  ARCHIVED_FILE_NAME
} from '../variables/common.js'
import { checkIsExist } from '../helpers/checkIsExist.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const compress = async () => {
  const fileName = join(__dirname, FILES_FOLDER_NAME, FILE_TO_COMPRESS_NAME)
  const archivedFile = join(__dirname, FILES_FOLDER_NAME, ARCHIVED_FILE_NAME)
  const isFileExist = await checkIsExist(fileName)

  if(!isFileExist) {
    throw new Error(COMMON_ERROR_MESSAGE)
  }

  const readableStream = createReadStream(fileName)
  const writableStream = createWriteStream(archivedFile)
  const gzip = createGzip()

  pipeline(readableStream, gzip, writableStream, (error) => {
    if (error) {
      throw new Error(COMMON_ERROR_MESSAGE)
    }
  })
}

await compress()
