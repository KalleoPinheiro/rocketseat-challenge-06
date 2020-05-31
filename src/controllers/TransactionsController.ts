import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

export class TransactionsController {
  public async list(
    _: Request,
    response: Response,
  ): Promise<Response<Transaction[]> | []> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactions = await transactionRepository.getTransactions();
    return response.status(200).json(transactions);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { title, value, type, category: category_name } = request.body;

    const transaction = await CreateTransactionService.execute({
      title,
      value,
      type,
      category_name,
    });

    return response.status(201).json(transaction);
  }

  public async remove(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await DeleteTransactionService.execute(id);
    return response.sendStatus(204);
  }

  public async import(request: Request, response: Response): Promise<Response> {
    const transactions = await ImportTransactionsService.execute(
      request.file.path,
    );
    return response.status(200).json(transactions);
  }
}

export default new TransactionsController();
