import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BankAccount from './BankAccount';
import FormBankAccount from './FormBankAccount';
import '../../styles/BankAccountList.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';

const BankAccountList = () => {

  const [bankAccounts, setBankAccounts] = useState([]);
  useEffect( () => {
    Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
      //setCurrencies(response)
      //console.log(response.data);
      setBankAccounts(response.data);
      console.log("Bank Accounts: ");
      console.log(bankAccounts);
      
    });
  },[]);

  

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
                key= {bankAccount.id} />
              ) 
          }
        </Accordion>
      </div>  
      <FormBankAccount key="123456"/>
    </>
  );
};

export default BankAccountList;