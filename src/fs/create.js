import { promises as fsPromises } from 'fs';
import path from 'path';

const fileName = 'fresh.txt';
const moduleURL = new URL(import.meta.url);
const folderPath = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(folderPath, fileName);
const fileContent = 'I am fresh and young';

const create = async () => {
    try {
        await fsPromises.access(filePath);
        throw new Error('FS operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }

        await fsPromises.writeFile(filePath, fileContent);
    }
};

await create();
