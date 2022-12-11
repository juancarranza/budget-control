import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BankAccount from './BankAccount';
import FormBankAccount from './FormBankAccount';
import '../../styles/BankAccountList.css';

const BankAccountList = () => {

  return (
    <>
    <div className='container list-bnk-acc'>
      <Accordion defaultActiveKey="0">
        <BankAccount balance='40.00' currency={{symbol: '$', name: 'USD - $'}} name='Test Bank Account 1' creation_date='12/10/2022' initial_ammount='10.00' id='1' key='1' />
        <BankAccount balance='-40.00' currency={{symbol: 'Q', name: 'GTQ - Q'}} name='Test Bank Account 2' creation_date='12/09/2022' initial_ammount='100.00' id='2' key='2' />
      </Accordion>
    </div>  
    <FormBankAccount />
    
    </>
  );
};

export default BankAccountList;