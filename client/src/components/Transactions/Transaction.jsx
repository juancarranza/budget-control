import {React, useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { Eye, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import '../../styles/BankAccountList.css';
import '../../styles/BankAccount.css';

function CustomToggle({ eventKey }) {

  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log('totally custom!'),
  );

  return (
    <Button variant="outline-secondary" onClick={decoratedOnClick} ><Eye /></Button>
  );
}

const Transaction = (props) => {
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
              <div className='big_text_2'>{props.category.name}</div>    
              <div className={props.ammount>=0?'positive_balance':'negative_balance'}>
                {props.currency.symbol+' '+props.ammount}
              </div>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <CustomToggle eventKey={props.id}>
              </CustomToggle>
              <Dropdown className={ props.category.name === 'transfer'? 'not-visible':'visible' }>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowEdit} >Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleShowDelete} >Delete Category</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <p>Creation date: {props.creation_date}</p>
              <p>Currency: {props.currency.name}</p>
              <p>Notes: {props.notes}</p>
            </Card.Body>
          </Accordion.Collapse>
      </Card>
    </>
  );
};

export default Transaction;