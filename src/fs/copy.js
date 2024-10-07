import { promises as fsPromises } from 'fs';
import path from 'path';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const destinationFolder = path.join(path.dirname(moduleURL.pathname), 'files_copy');

async function copy() {
    try {
        await fsPromises.access(sourceFolder);

        try {
            await fsPromises.stat(destinationFolder);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code === 'ENOENT') {
                await fsPromises.mkdir(destinationFolder);

                const files = await fsPromises.readdir(sourceFolder);

                for (const file of files) {
                    const sourceFilePath = path.join(sourceFolder, file);
                    const destinationFilePath = path.join(destinationFolder, file);

                    await fsPromises.copyFile(sourceFilePath, destinationFilePath);
                }

            } else {
                throw error;
            }
        }
    } catch (error) {
        throw error;
    }
}

await copy();
