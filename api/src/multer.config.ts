/* eslint-disable prettier/prettier */
import { diskStorage } from 'multer';
import { tmpdir } from 'os';
import { join } from 'path';

export const storage = diskStorage({
  destination: join(tmpdir(), 'uploads'),
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});
