import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/FormBankAccount.css';
import { Plus } from 'react-bootstrap-icons';
import Axios from 'axios';

const FormCategory = ( {loadCategories} ) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [category, setCategory] = useState({
    categoryType:'',
    name:'',
    description:''
  });

  const resetValues = () => {
    setCategory({
      categoryType:'',
      name:'',
      description:''
    });
  };

  const closeForm = () =>{
    handleClose();
    resetValues();
  };

  const handleChange = (e) => {
    setCategory({...category, [e.target.name]:e.target.value});
    console.log("Category: ");
    console.log(category);
  };

  const handleCreate = (e) => {
    handleClose();
    console.log("Create");
    Axios.post('http://localhost:3001/api/budget-control/category/create', { category }).
      then((response)=> {
        console.log(response);
        loadCategories();
      });
    resetValues();
  };

  return (
    
    <>
      <Button variant="primary" onClick={handleShow} className="new-BkAcc" style={{borderRadius: '60%'}}>
        <Plus  size="lg"/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={category.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.Select"
            >
              <Form.Label>Category Type</Form.Label>
              <Form.Select 
                aria-label="Default select example" 
                onChange={handleChange} 
                name="categoryType" 
              >
                  <option value="none" >Select an Option</option>
                  <option value="expense" >Expense</option>
                  <option value="income" >Income</option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" 
                rows={3} 
                value={category.description} 
                onChange={handleChange} 
                name="description" 
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={closeForm} style={{ color: '#2196f3'}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      

    </>
  );
};

export default FormCategory;