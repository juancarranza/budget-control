import { React, useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Transaction from './Transaction';
import '../../styles/BankAccountList.css';
import Axios from 'axios';

/*
    Component that will be used when the we clicked on:
    1. Transactions
    2. Account
*/
const TransactionList = () => {

  const transaction = {
    id_user: '784f7322-e0ed-4930-b876-17778c183cb7'
  };

  const [transactions, setTransactions] = useState([]);
  const loadTransactions = () => {
    Axios.post('http://localhost:3001/api/budget-control/transaction', { transaction }).then((response)=>{ 
      const lista = response.data;
      console.log(lista);
      setTransactions(lista);

      console.log("Transactions: ");
      console.log(transactions);
    });
  };
  useEffect( () => loadTransactions(),[]);//[] cuando esta vacio significa que se ejecuta cuando se crea/monta el componente (1 sola vez)

  return (
    <>
      <div className='container list-bnk-acc'>
        
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-between' >
                <CaretLeftFill /> <div className='header-text'>Wallet<br/>December 2022</div> <CaretRightFill />
              </div>
            </Card.Body>
          </Card>
        <Accordion defaultActiveKey="0">
          {
            transactions.map(
              (transaction) => 
                <Transaction 
                  id = {transaction.id}
                  key = {transaction.id}
                  ammount = {transaction.ammount}
                  description = {transaction.description}
                  creation_date = {transaction.createdAt}
                  currency = {
                    {
                      id: transaction.id_currency,
                      name: transaction.CURRENCY,
                      symbol: transaction.CURRENCY_SYMBOL,
                      exchange_rate: transaction.exchangeRate
                    }
                  }
                  category = {
                    {
                      id: transaction.id_category,
                      name: transaction.CATEGORY,
                      category_type: transaction.categoryType
                    }
                  }
      
                  bank_account = {
                    {
                      id: transaction.id_bankaccount,
                      name: transaction.BANK_ACCOUNT
                    }
                  } 
                />
            )
          }
          {/* <Transaction />
          <Transaction /> */}
        </Accordion>
      </div>
    </>
  );
};

export default TransactionList;