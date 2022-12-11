import {React, useState} from 'react';
import { Eye, ArrowLeftRight, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../styles/BankAccount.css';
import Transfer from './Transfer';


function CustomToggle({ eventKey }) {

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button variant="outline-secondary" onClick={decoratedOnClick} ><Eye /></Button>
  );
}


const BankAccount = (props) => {

  const [showTransfer, setShowTransfer] = useState(false);

  const handleCloseTransfer = (showModalT) => setShowTransfer(showModalT);
  const handleShowTransfer = () => setShowTransfer(true);
  return (
    <>   
        <Card className="d-flex bnk-Acc-item" >
          <Card.Header className='d-flex flex-column flex_layout'>
            <div className='d-flex justify-content-between'>
              <div className='big_text_2'>{props.name}</div>    
              <div className={props.balance>=0?'positive_balance':'negative_balance'}>
                {props.currency.symbol+' '+props.balance}</div>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <CustomToggle eventKey={props.id}>
              </CustomToggle>
              <Button variant="outline-secondary" onClick={handleShowTransfer}> <ArrowLeftRight /> </Button>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Edit</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Delete Account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </div>
            
            
          </Card.Header>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <p>Creation date: {props.creation_date}</p>
              <p>Currency: {props.currency.name}</p>
              <p>Initial ammount: {props.currency.symbol+' '+props.initial_ammount}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Transfer onHide={handleCloseTransfer} show={showTransfer} name_origin_acc={props.name} id_origin_acc={props.id}/>
    </>
  );
};

export default BankAccount;