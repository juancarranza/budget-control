import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const EditBankAccount = (props) => {

  const editClose = () => {
    props.onHide(false);
  };
  

  return (
    <>
      <Modal show={props.show} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={props.bank_account.name}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.Select"
            >
              <Form.Label>Currency</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">USD - $</option>
                <option value="2">GTQ - Q</option>
                <option value="3">CAN - $</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Initial Ammount</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                value={props.bank_account.initial_ammount}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={props.bank_account.description}/>
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={editClose} style={{ color: '#2196f3'}}>
            Close
          </Button>
          <Button variant="primary" onClick={editClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditBankAccount;