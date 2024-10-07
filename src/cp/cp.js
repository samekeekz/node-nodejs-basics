import path from 'path';
import { spawn } from 'child_process';

const moduleURL = new URL(import.meta.url);
const sourceFolder = path.join(path.dirname(moduleURL.pathname), 'files');
const filePath = path.join(sourceFolder, "script.js");

const spawnChildProcess = async (args) => {
    const childProcess = spawn('node', [filePath, ...args], { stdio: ['pipe', 'pipe', 'inherit', 'ipc'] });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.pipe(process.stdout);

};

spawnChildProcess([1, 2, 3, "a", "b", "hello"]);
