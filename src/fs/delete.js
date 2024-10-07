import { promises as fsPromises } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const folderPath = path.join(path.dirname(moduleURL.pathname), 'files');
const fileToRemoveName = 'fileToRemove.txt';

const remove = async () => {
    try {
        const filePath = path.join(folderPath, fileToRemoveName);
        await fsPromises.access(filePath);

        await fsPromises.unlink(filePath);
    } catch {
        throw new Error('FS operation failed');
    }
};

await remove();
