import { getCustomRepository, getRepository} from 'typeorm';
// import AppError from '../errors/AppError';

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
    // const categoryRepository = getRepository(Category);

    // const findCategoryId = await categoryRepository.findOne({
    //   where: {category}
    // });

    // if (!findCategoryId) {
    //   const newCategory = await categoryRepository.create({
    //     title: category
    //   });
    //   categoryRepository.save(newCategory);
    // }

    // const categoryId = await categoryRepository.find({
    //   where: 
    // })

    const transaction = transactionRepository.create({
      title,
      value,
      type
    });

    await transactionRepository.save(transaction);

    return transaction;

  }
}

export default CreateTransactionService;
