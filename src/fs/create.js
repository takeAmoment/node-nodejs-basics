import { access, constants, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const content = 'I am fresh and young';
const successMessage = 'This file was created successfully';
const errorMessage = 'This file already exists';

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');
    
    try {
        await access(filePath, constants.F_OK);
        throw new Error(errorMessage);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(filePath, content);
            console.log(successMessage);
        } else {
            console.log('Error:', err.message);
        }
    }
};

await create();