import { Request, Response } from 'express';

import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

export class TransactionsController {
  // public async index(request: Request, response: Response): Promise<void> {}

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category_id } = request.body;

    const transaction = await CreateTransactionService.execute({
      title,
      value,
      type,
      category_id,
    });

    return response.status(200).json(transaction);
  }
}

export default new TransactionsController();
