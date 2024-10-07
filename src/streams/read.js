import { createReadStream } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(sourceFolder, 'fileToRead.txt');

const read = async () => {
    return new Promise((resolve, reject) => {
        const stream = createReadStream(filePath, { encoding: 'utf-8' });

        stream.on('data', (chunk) => {
            process.stdout.write(chunk);
        });

        stream.on('end', () => {
            resolve();
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
};

await read();