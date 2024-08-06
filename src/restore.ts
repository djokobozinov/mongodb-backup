import { exec } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// MongoDB URI and backup directory from environment variables
const mongoUri = 'mongodb://localhost:27017/football-test';
const backupDir = path.join(__dirname, '/dump/football');
console.log(backupDir);
if (!mongoUri) {
  console.error('MongoDB URI is not defined.');
  process.exit(1);
}

const MONGORESTORE_PATH = 'mongorestore';

// Construct the mongorestore command
const cmd = `${MONGORESTORE_PATH} --uri=${mongoUri} --dir=${backupDir} --drop`;

// Execute the mongorestore command
exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`Restore failed: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`Restore completed successfully: ${stdout}`);
});