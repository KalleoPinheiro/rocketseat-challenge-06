import { EntityRepository, getRepository, Repository } from 'typeorm';
import Transaction from '../models/Transaction';
import TypeTransaction from '../enums/TypeTransactions.enum';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Response {
  transactions: Transaction[];
  balance: Balance;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getTransactions(): Promise<Response> {
    const transactionsRepository = getRepository(Transaction);

    const transactions: Transaction[] = await transactionsRepository.find({
      select: [
        'id',
        'title',
        'value',
        'type',
        'category',
        'created_at',
        'updated_at',
      ],
      relations: ['category'],
    });

    const balance = transactions?.reduce((acc: any, obj: Transaction) => {
      const key: TypeTransaction = obj.type;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {} as Balance);

    const income =
      balance.income?.reduce(
        (acc: number, prev: Transaction) => +acc + +prev.value,
        0,
      ) || 0;

    const outcome =
      balance.outcome?.reduce(
        (acc: number, prev: Transaction) => +acc + +prev.value,
        0,
      ) || 0;

    return {
      transactions,
      balance: { income, outcome, total: +income - +outcome },
    };
  }
}

export default TransactionsRepository;
