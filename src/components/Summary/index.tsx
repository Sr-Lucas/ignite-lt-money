import React from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles';

export const Summary: React.FC = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'deposit')  {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const totalOutcome = transactions.reduce((acc, transaction) => {
    if(transaction.type === 'withdraw')  {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const total = totalIncome - totalOutcome;

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalIncome)}
        </strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Entradas" />
        </header>
        <strong>
          -
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(totalOutcome)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(total)}
        </strong>
      </div>
    </Container>
  );
}