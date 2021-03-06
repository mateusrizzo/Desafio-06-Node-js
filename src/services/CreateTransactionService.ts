import { getCustomRepository, getRepository} from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionRepository from '../repositories/TransactionsRepository';

interface Request {
    title: string;
    type: 'income'|'outcome';
    value: number;
    category: string;
}

class CreateTransactionService {
  public async execute({title, type, value, category}: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionRepository);
    const categoryRepository = getRepository(Category);
    const balance = await transactionRepository.getBalance();

    if(type === 'outcome' && value > balance.total) {
      throw new AppError('Insufficent funds for transaction');
    }

    let transactionCategory = await categoryRepository.findOne({
      where: {title: category}
    });

    if (!transactionCategory) {
      transactionCategory = categoryRepository.create({
        title: category
      });
      await categoryRepository.save(transactionCategory);
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory
    });

    await transactionRepository.save(transaction);

    return transaction;

  }
}

export default CreateTransactionService;
