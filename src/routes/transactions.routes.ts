import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../configs/upload-files';
import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();
const upload = multer(uploadConfig);

transactionsRouter.post('/', TransactionsController.store);
transactionsRouter.get('/', TransactionsController.list);
transactionsRouter.delete('/:id', TransactionsController.remove);
transactionsRouter.post(
  '/import',
  upload.single('file'),
  TransactionsController.import,
);

export default transactionsRouter;
