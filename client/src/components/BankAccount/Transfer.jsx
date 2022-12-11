import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Transfer = (props) => {

  const transferClose= () => {
    props.onHide(false);
  };

  return (
    <>
       <Modal show={props.show} onHide={transferClose}>
        <Modal.Header closeButton>
          <Modal.Title>Transfer Between Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="transfer.account">
              <Form.Label>From {props.name_origin_acc} to:</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Test Bank Account 1</option>
                <option value="2">Test Bank Account 2</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="transfer.ammount">
              <Form.Label>Transfer Ammount</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                autoFocus
              />
            </Form.Group>
            

            <Form.Group
              className="mb-3"
              controlId="transfer.notes"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={transferClose} style={{ color: '#2196f3'}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={transferClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  );
};

export default Transfer;