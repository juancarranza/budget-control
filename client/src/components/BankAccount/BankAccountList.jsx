import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BankAccount from './BankAccount';
import FormBankAccount from './FormBankAccount';
import '../../styles/BankAccountList.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const BankAccountList = () => {

  const [bankAccounts, setBankAccounts] = useState([]);
  const user = useSelector((state) => state.user);

  const loadLista = () => {
    Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
      const lista = response.data;
      const lista_user = lista.filter( (x) => {
        return x.id_user === user.user.id;
      }
      );
      setBankAccounts(lista_user);
      console.log("Bank Accounts: ");
      console.log(bankAccounts);
    });
  };

  useEffect( () => loadLista(),[]);//[] cuando esta vacio significa que se ejecuta cuando se crea/monta el componente (1 sola vez)

  

  return (
    <>
      <div className='container list-bnk-acc'>
        <Accordion defaultActiveKey="0">
          {
            bankAccounts.map((bankAccount) => 
              <BankAccount 
                balance= {bankAccount.initialAmmount + bankAccount.SUMA_TRANSACCIONES}
                currency={{id: bankAccount.id_currency, symbol: bankAccount.symbol, name: bankAccount.CURRENCY, exchangeRate: bankAccount.exchangeRate}} 
                name= {bankAccount.name} 
                creation_date= {bankAccount.createdAt} 
                initial_ammount= {bankAccount.initialAmmount}
                description = {bankAccount.description} 
                id= {bankAccount.id} 
                key= {bankAccount.id} 
                loadLista={loadLista}
                />
              ) 
          }
        </Accordion>
      </div>  
      <FormBankAccount key="123456" loadLista={loadLista}/>
    </>
  );
};

export default BankAccountList;