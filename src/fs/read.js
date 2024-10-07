import { promises as fsPromises } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const folderPath = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(folderPath, 'fileToRead.txt');

const readFileContent = async () => {
    try {
        const content = await fsPromises.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        throw new Error('FS operation failed: File not found.');
    }
};

readFileContent();
