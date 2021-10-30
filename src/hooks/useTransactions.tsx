import { AxiosResponse } from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

type Transaction = {
  id?: number;
  title: string;
  type: string;
  category: string
  amount: number;
  createdAt?: string;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: Transaction) => Promise<void>
}

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export const TransactionsProvider: React.FC = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions').then(
      (response) => {
        const data = response.data as {transactions: [Transaction]};
        setTransactions(data.transactions)
      }
    );
  }, [])

  async function createTransaction(transaction: Transaction): Promise<void> {
    const response = await api.post<Transaction, AxiosResponse<{transaction: Transaction}>>(
      '/transactions', 
      {
        ...transaction,
        createdAt: new Date(),
      }
    );

    const { transaction: createdTransaction } = response.data;

    setTransactions([...transactions, createdTransaction]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}