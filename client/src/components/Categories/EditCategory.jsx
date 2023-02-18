import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/FormBankAccount.css';
import Axios from 'axios';

const EditCategory = (props) => {
  const [category, setCategory] = useState({
    id: props.category.id,
    categoryType: props.category.categoryType,
    name: props.category.name,
    description: props.category.description
  });

  const handleChange = (e) => {
    setCategory({...category, [e.target.name]:e.target.value});
    console.log("Category: ");
    console.log(category);
  };

  const handleUpdate = (e) =>{
    console.log("update");
    editClose();
    Axios.put('http://localhost:3001/api/budget-control/category/update', { category }).
      then((response)=> {
        console.log(response);
        props.loadCategories();
      });
    props.loadCategories();
  };

  const editClose = () => {
    props.onHide(false);
  };

  return (
    <>
      <Modal show={props.show} onHide={editClose}>
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
                value = {category.categoryType}
              >
                  
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
          <Button variant="light" onClick={editClose} style={{ color: '#2196f3'}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditCategory;