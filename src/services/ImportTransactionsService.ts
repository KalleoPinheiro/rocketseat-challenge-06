import csvParse from 'csv-parse';
import fs from 'fs';
import { getCustomRepository, getRepository, In } from 'typeorm';
import TypeTransaction from '../enums/TypeTransactions.enum';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CsvTransaction {
  title: string;
  type: TypeTransaction;
  value: number;
  category: string;
}
class ImportTransactionsService {
  async execute(filePath: string): Promise<Transaction[]> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);
    const readStream = await fs.createReadStream(filePath);

    const parseStream = csvParse({
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });

    const transactions: CsvTransaction[] = [];
    const categories: string[] = [];

    const parseCSV = readStream.pipe(parseStream);

    parseCSV.on('data', line => {
      const [title, type, value, category] = line;

      if (!title || !type || !value) return;

      categories.push(category);
      transactions.push({ title, type, value, category });
    });

    await new Promise(resolve => {
      parseCSV.on('end', resolve);
    });

    const existsCategory = await categoryRepository.find({
      where: {
        title: In(categories),
      },
    });

    const existsCategoryTitle = existsCategory.map(
      (category: Category) => category.title,
    );

    const addCategoriesTitleNotExists = categories
      .filter(category => !existsCategoryTitle?.includes(category))
      .filter((value, index, self) => self.indexOf(value) === index);

    const newCategories = categoryRepository.create(
      addCategoriesTitleNotExists.map(title => ({
        title,
      })),
    );

    await categoryRepository.save(newCategories);

    const finalCategories = [...newCategories, ...existsCategory];

    const createdtTansactions = transactionRepository.create(
      transactions.map(transaction => ({
        title: transaction.title,
        type: transaction.type,
        value: transaction.value,
        category_id: finalCategories.find(
          category => category.title === transaction.category,
        )?.id,
      })),
    );

    const newTransactions = await transactionRepository.save(
      createdtTansactions,
    );

    await fs.promises.unlink(filePath);
    return newTransactions;
  }
}

export default new ImportTransactionsService();
