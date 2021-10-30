import React, { FormEvent, useContext, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

import { Container, RadioBox, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  onRequestClose: () => void;
  isNewTransactionModalOpen: boolean;
}

Modal.setAppElement('#root');

const NewTransactionModal: React.FC<NewTransactionModalProps> = ({
   onRequestClose, 
   isNewTransactionModalOpen
}) => {
  const { createTransaction } = useTransactions();

  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState('');

  const [type, setType] = useState('deposit');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount: value,
      category,
      type,
    });

    setCategory('');
    setTitle('');
    setValue(0);
    setType('deposit');

    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isNewTransactionModalOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Container onSubmit={handleCreateNewTransaction}>
        <button 
          type="button" 
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="Fechar"/>
        </button>
        <h2>Cadastrar transação</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text" 
          placeholder="Título" 
        />

        <input
          onChange={(e) => setValue(Number(e.target.value))}
          value={value} 
          type="number" 
          placeholder="Valor" 
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          type="text" 
          placeholder="Categoria" 
        />
        
        <button type="submit">Cadastrar</button>
  
      </Container>
    </Modal>
  );
}

export default NewTransactionModal;