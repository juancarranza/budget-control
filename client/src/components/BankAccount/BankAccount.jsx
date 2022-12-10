import React from 'react';
import { Eye, ArrowLeftRight, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

function CustomToggle({ eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button variant="outline-secondary" ><Eye onClick={decoratedOnClick}/></Button>
  );
}


const BankAccount = (props) => {
  return (
    <>   
        <Card className="d-flex">
          <Card.Header className='d-flex flex-column flex_layout'>
            <div className='d-flex justify-content-between'>
              <div>{props.name}</div>    
              <div>{props.balance}</div>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <CustomToggle eventKey="0">Click me!</CustomToggle>
              <Button variant="outline-secondary"> <ArrowLeftRight /> </Button>
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
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>Creation date: 09/10/2022</p>
              <p>Currency: USD - $</p>
              <p>Initial ammount: $ 10.00</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
    </>
  );
};

export default BankAccount;