import {React, useState} from 'react';
import { Eye, ArrowLeftRight, ThreeDotsVertical } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import '../../styles/BankAccount.css';
import EditCategory from './EditCategory';
import DeleteCategory from './DeleteCategory';



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
      <>
        <Card className="d-flex bnk-Acc-item" >
          <Card.Header className='d-flex flex-column flex_layout'>
            <div className='d-flex justify-content-between'>
              <div className='big_text_2'>{props.name[0].toUpperCase()+props.name.substring(1)}</div>    
              <div className={props.categoryType.toUpperCase() === 'INCOME'?'positive_balance':'negative_balance'}>
                {props.categoryType[0].toUpperCase() + props.categoryType.substring(1)}
              </div>
            </div>
            <div className='d-flex justify-content-end align-items-end'>
              <CustomToggle eventKey={props.id}>
              </CustomToggle>
              <Dropdown className={ props.edit === true? 'visible':'not-visible' }>
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
              <p>Description: {props.description}</p>
              
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <EditCategory 
          onHide={handleCloseEdit}  
          show={showEdit} 
          category={
            { id: props.id, 
              name: props.name, 
              categoryType: props.categoryType,
              description: props.description
            }
          }
          loadCategories = { props.loadCategories }     
        />

        <DeleteCategory 
          onHide={handleCloseDelete} 
          show={showDelete} 
          category_name={props.name} 
          category_id={props.id} 
          loadCategories = { props.loadCategories }  
        />
      </>
  );
};

export default Category;