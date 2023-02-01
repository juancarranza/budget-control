import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';

const DeleteCategory = (props) => {

  const deleteClose = () => {
    props.onHide(false);
  };

  const deleteCategory = () => {
    deleteClose();
    const id = props.category_id;
  };

  return (
    <>
      <Modal show={props.show} onHide={deleteClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete "{props.category_name}"?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this category.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteCategory}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteCategory;