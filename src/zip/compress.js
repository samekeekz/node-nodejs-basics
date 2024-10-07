import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const inputFile = path.join(sourceFolder, 'fileToCompress.txt');
const outputFile = path.join(sourceFolder, 'archive.gz');

const compress = async () => {
    const readStream = createReadStream(inputFile);

    const writeStream = createWriteStream(outputFile);

    const gzip = createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    await new Promise((resolve) => {
        writeStream.on('finish', resolve);
    });

};

await compress();