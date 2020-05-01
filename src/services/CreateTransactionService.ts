import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TypeTransaction from '../enums/TypeTransactions.enum';

interface Data {
  title: string;
  value: number;
  type: TypeTransaction;
  category_id: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_id,
  }: Data): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const transaction = await transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    if (!transaction) {
      throw new AppError('Transaction create failed!', 400);
    }

    transactionRepository.save(transaction);

    return transaction;
  }
}

export default new CreateTransactionService();
