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


const Category = (props) => {

    {/* State and functions used to handle the Modal to Edit */}
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = (showModalEdit) => setShowEdit(showModalEdit);
    const handleShowEdit = () => setShowEdit(true);

    {/* State and functions used to handle the Modal to Delete */}
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = (showModalDel) => setShowDelete(showModalDel);
    const handleShowDelete = () => setShowDelete(true);


    return (
        <Card className="d-flex bnk-Acc-item" >
          <Card.Header className='d-flex flex-column flex_layout'>
            <div className='d-flex justify-content-between'>
              <div className='big_text_2'>{props.name}</div>    
              <div className={props.categoryType.toUpperCase() === 'INCOME'?'positive_balance':'negative_balance'}>
                {props.categoryType[0].toUpperCase() + props.categoryType.substring(1)}</div>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <CustomToggle eventKey={props.id}>
              </CustomToggle>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                  <ThreeDotsVertical />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowEdit} className={props.edit === true? 'visible':'not-visible'}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={handleShowDelete} className={props.edit === true? 'visible':'not-visible'} >Delete Category</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> 
            </div>
            
            
          </Card.Header>
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body>
              <p>Creation date: {props.creation_date}</p>
              <p>Description: {props.description}</p>
              
            </Card.Body>
          </Accordion.Collapse>
        </Card>
  );
};

export default Category;