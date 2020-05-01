import { Router } from 'express';

import TransactionsController from '../controllers/TransactionsController';

const transactionsRouter = Router();

transactionsRouter.post('/', TransactionsController.store);

// transactionsRouter.post('/', async (request, response) => {
//   // TODO
// });

// transactionsRouter.delete('/:id', async (request, response) => {
//   // TODO
// });

// transactionsRouter.post('/import', async (request, response) => {
//   // TODO
// });

export default transactionsRouter;
