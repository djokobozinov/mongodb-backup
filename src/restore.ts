import { exec } from 'child_process';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.RESTORE_URI;
const backupDirName = process.env.BACKUP_DIR_FOLDER || 'backup';

const rootPath = path.resolve(__dirname, '..');
const backupDir = path.join(rootPath, 'dump', backupDirName);

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
