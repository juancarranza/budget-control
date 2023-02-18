import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

const DeleteTransaction = (props) => {

  const deleteClose = () => {
    props.onHide(false);
  };

  const deleteTransaction = () => {
  deleteClose();
  const transaction = { id: props.transaction_id }
  Axios.put('http://localhost:3001/api/budget-control/transaction/delete', { transaction }).
      then((response)=> {
      console.log(response);
      props.loadTransactions();
      });
  };

  return (
    <>
      <Modal show={props.show} onHide={deleteClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete "{props.category_name}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this transaction.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteTransaction}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteTransaction;