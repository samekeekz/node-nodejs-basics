import { createReadStream } from 'fs';
import { createHash } from 'crypto';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(sourceFolder, 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    return new Promise((resolve, reject) => {
        const hash = createHash('sha256');
        const stream = createReadStream(filePath);

        stream.on('data', (chunk) => {
            hash.update(chunk);
        });

        stream.on('end', () => {
            const hashResult = hash.digest('hex');
            console.log(`${hashResult}`);
            resolve(hashResult);
        });

        stream.on('error', (error) => {
            console.error(`Error reading file: ${error.message}`);
            reject(error);
        });
    });
};

await calculateHash();
