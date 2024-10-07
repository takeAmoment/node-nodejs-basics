import { spawn } from 'child_process'
import { stdin, stdout } from 'process'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import { COMMON_ERROR_MESSAGE, FILES_FOLDER_NAME } from '../variables/common.js'

const FILE_NAME = 'script.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = dirname(__fileName)

const spawnChildProcess = async (args) => {
  const filePath = join(__dirname, FILES_FOLDER_NAME, FILE_NAME)

  const child = spawn('node', [filePath, ...args])

  stdin.pipe(child.stdin)
  child.stdout.pipe(stdout)

  child.on('error', () => {
    throw new Error(COMMON_ERROR_MESSAGE)
  })
}

spawnChildProcess([1, 2, 3])

