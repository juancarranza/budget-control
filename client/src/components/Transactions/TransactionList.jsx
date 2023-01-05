import React from 'react';
import Card from 'react-bootstrap/Card';
import { CaretRightFill, CaretLeftFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Transaction from './Transaction';

/*
    Component that will be used when the we clicked on:
    1. Transactions
    2. Account
*/
const TransactionList = () => {
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
          <Transaction />
          <Transaction />
        </Accordion>
      </div>
    </>
  );
};

export default TransactionList;