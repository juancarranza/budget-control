import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import BankAccount from './BankAccount';
import FormBankAccount from './FormBankAccount';

const BankAccountList = () => {
  return (
    <>
      <Accordion defaultActiveKey="0">
        <BankAccount balance='$ 40' name='Test Bank Account' />
      </Accordion>
      <FormBankAccount />
    </>
  );
};

export default BankAccountList;