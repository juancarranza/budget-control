import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BankAccount from './BankAccount';
import FormBankAccount from './FormBankAccount';
import '../../styles/BankAccountList.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const BankAccountList = () => {

  const [bankAccounts, setBankAccounts] = useState([]);

  const loadLista = () => {
    Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
      setBankAccounts(response.data);
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
                currency={{id: bankAccount.id_currency, symbol: bankAccount.symbol, name: bankAccount.CURRENCY}} 
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