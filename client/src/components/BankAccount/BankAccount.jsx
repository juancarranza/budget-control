import {React, useState} from 'react';
import { Eye, ArrowLeftRight, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../styles/BankAccount.css';
import Transfer from './Transfer';
import EditBankAccount from './EditBankAccount';
import DeleteBankAccount from './DeleteBankAccount';


function CustomToggle({ eventKey }) {

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button variant="outline-secondary" onClick={decoratedOnClick} ><Eye /></Button>
  );
}


const BankAccount = (props) => {
{/* state and functions used to handle the Modal to Transfer */}
  const [showTransfer, setShowTransfer] = useState(false);
  const handleCloseTransfer = (showModalT) => setShowTransfer(showModalT);
  const handleShowTransfer = () => setShowTransfer(true);

{/* State and functions used to handle the Modal to Edit */}
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = (showModalEdit) => setShowEdit(showModalEdit);
  const handleShowEdit = () => setShowEdit(true);

{/* State and functions used to handle the Modal to Delete */}
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = (showModalDel) => setShowDelete(showModalDel);
  const handleShowDelete = () => setShowDelete(true);

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
                  <Dropdown.Item onClick={handleShowEdit} >Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleShowDelete} >Delete Account</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </div>
            
            
          </Card.Header>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <p>Creation date: {props.creation_date}</p>
              <p>Currency: {props.currency.name}</p>
              <p>Currency ID: {props.currency.id}</p>
              <p>Initial ammount: {props.currency.symbol+' '+props.initial_ammount}</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Transfer 
          onHide={handleCloseTransfer} 
          show={showTransfer} 
          name_origin_acc={props.name} 
          id_origin_acc={props.id} 
          currency_origin={
            {
              id: props.currency.id, 
              exchange_rate_from: props.currency.exchangeRate    
            }
          }
          loadLista={props.loadLista} 
        />
        <EditBankAccount onHide={handleCloseEdit} loadLista={props.loadLista} show={showEdit} 
          bank_account={
            { id: props.id, 
              name: props.name, 
              creation_date: props.creation_date,
              initial_ammount: props.initial_ammount,
              description: props.description,
              currency: {
                id: props.currency.id,
                name: props.currency.name,
                symbol: props.currency.symbol
              },
            }
          } 
        />
        <DeleteBankAccount 
          onHide={handleCloseDelete} 
          loadLista={props.loadLista} 
          show={showDelete} 
          account_name={props.name} 
          account_id={props.id} 
        />
        
    </>
  );
};

export default BankAccount;