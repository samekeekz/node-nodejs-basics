import { createWriteStream } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(sourceFolder, 'fileToWrite.txt');


const write = async () => {
    return new Promise((resolve, reject) => {
        const stream = createWriteStream(filePath, { encoding: 'utf-8' });

        process.stdin.pipe(stream);

        stream.on('finish', () => {
            resolve();
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
};


await write();