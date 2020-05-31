import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    if (!id) {
      throw new AppError('Param id not exists!', 400);
    }

    const transaction = await transactionsRepository.findOne({ where: { id } });

    if (!transaction) {
      throw new AppError('Transaction does not exists!', 400);
    }

    await transactionsRepository.remove(transaction);
  }
}

export default new DeleteTransactionService();
