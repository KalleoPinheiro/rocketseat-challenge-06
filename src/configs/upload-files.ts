import { randomBytes } from 'crypto';
import { diskStorage } from 'multer';
import { resolve } from 'path';

const tempFolder = resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tempFolder,
  storage: diskStorage({
    destination: tempFolder,
    filename: (_, file, callback) => {
      const fileHash = randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
