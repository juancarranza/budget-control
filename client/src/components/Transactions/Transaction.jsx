import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Eye, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function CustomToggle({ eventKey }) {

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button variant="outline-secondary" onClick={decoratedOnClick} ><Eye /></Button>
  );
}

const Transaction = (props) => {
  return (
    <>
      <Card className="d-flex bnk-Acc-item" >
          <Card.Header className='d-flex flex-column flex_layout'>
            <div className='d-flex justify-content-between'>
              <div className='big_text_2'>{props.name}</div>    
              <div className={props.value>=0?'positive_balance':'negative_balance'}>
                {props.currency.symbol+' '+props.value}
              </div>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='big_text_2'>{props.name}</div>
              <CustomToggle eventKey={props.id}>
              </CustomToggle>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item >Edit Transaction</Dropdown.Item>
                  <Dropdown.Item >Delete Transaction</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </div>
            
            
          </Card.Header>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <p>Creation date: {props.date}</p>
              <p>Currency: {props.currency.name}</p>
              <p>Notes: {props.notes}</p>
            </Card.Body>
          </Accordion.Collapse>
      </Card>
    </>
  );
};

export default Transaction;