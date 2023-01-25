import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

const DeleteBankAccount = (props) => {
  const deleteClose = () => {
    props.onHide(false);
  };

  const deleteAccount = () => {
    deleteClose();
    const id = props.account_id;
    Axios.put('http://localhost:3001/api/budget-control/bank-account/delete', { id }).then((response)=> console.log(response));
  };
  return (
    <>
      <Modal show={props.show} onHide={deleteClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete "{props.account_name}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>All income and expenses associated with this account will be erased.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteAccount}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBankAccount;