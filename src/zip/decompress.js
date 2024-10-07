import { createReadStream, createWriteStream } from 'fs';
import { createGunzip } from 'zlib';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const inputFile = path.join(sourceFolder, 'archive.gz');
const outputFile = path.join(sourceFolder, 'fileToCompress.txt');

const decompress = async () => {


    const readStream = createReadStream(inputFile);

    const writeStream = createWriteStream(outputFile);

    const gunzip = createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    await new Promise((resolve) => {
        writeStream.on('finish', resolve);
    });

};

await decompress();