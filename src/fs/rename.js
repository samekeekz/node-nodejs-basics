import { promises as fsPromises } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const folderPath = path.join(path.dirname(moduleURL.pathname), 'files');
const sourceFileName = 'wrongFilename.txt';
const destinationFileName = 'properFilename.md';

const rename = async () => {
    try {
        const sourceFilePath = path.join(folderPath, sourceFileName);
        await fsPromises.access(sourceFilePath);

        const destinationFilePath = path.join(folderPath, destinationFileName);
        try {
            await fsPromises.access(destinationFilePath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fsPromises.rename(sourceFilePath, destinationFilePath);
            }
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
    }
};

await rename();
