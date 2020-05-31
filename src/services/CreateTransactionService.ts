import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';
import TypeTransaction from '../enums/TypeTransactions.enum';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Data {
  title: string;
  value: number;
  type: TypeTransaction;
  category_name: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category_name,
  }: Data): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    if (type === TypeTransaction.Outcome) {
      const { balance } = await transactionRepository.getTransactions();
      if (value > balance.total) {
        throw new AppError('Insuficient balance!', 400);
      }
    }

    let category = await categoryRepository.findOne({
      where: { title: category_name },
    });

    if (!category) {
      category = categoryRepository.create({
        title: category_name,
      });
      await categoryRepository.save(category);
      if (!category) {
        throw new AppError('Category create failed!', 400);
      }
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id: category.id,
    });

    await transactionRepository.save(transaction);

    if (!transaction) {
      throw new AppError('Transaction create failed!', 400);
    }

    return transaction;
  }
}

export default new CreateTransactionService();
