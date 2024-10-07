import { promises as fsPromises } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const folderPath = path.join(path.dirname(moduleURL.pathname), 'files');

const list = async () => {
    try {
        await fsPromises.access(folderPath);
        const files = await fsPromises.readdir(folderPath);
        files.forEach((file) => {
            console.log(file);
        });
    } catch {
        throw new Error('FS operation failed');

    }
};

await list();
