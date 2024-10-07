import path from 'path'
import { readFile } from 'fs/promises'
import { release, version } from 'os'
import { createServer as createServerHttp } from 'http'
import { fileURLToPath } from 'url'

import './files/c.js'

const __fileName = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__fileName)

const random = Math.random()

const a = JSON.parse(await readFile(new URL('./files/a.json', import.meta.url)))
const b = JSON.parse(await readFile(new URL('./files/b.json', import.meta.url)))

export let unknownObject

if (random > 0.5) {
  unknownObject = a
} else {
  unknownObject = b
}

console.log(`Release ${release()}`)
console.log(`Version ${version()}`)
console.log(`Path segment separator is "${path.sep}"`)

console.log(`Path to current file is ${__fileName}`)
console.log(`Path to current directory is ${__dirname}`)

export const myServer = createServerHttp((_, res) => {
  res.end('Request accepted')
})

const PORT = 3000

console.log(unknownObject)

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
  console.log('To terminate it, use Ctrl+C combination')
})

