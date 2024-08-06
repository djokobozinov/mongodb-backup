import { spawn } from 'child_process';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.LSR_URI;

if (!mongoUri) {
  console.error('MongoDB URI is not defined.');
  process.exit(1);
}

const backupProcess = spawn('mongodump', [
  `--uri=${mongoUri}`,
]);

backupProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

backupProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

backupProcess.on('close', (code) => {
  console.log(`mongodump process exited with code ${code}`);
});