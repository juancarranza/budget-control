import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CircleFill } from 'react-bootstrap-icons';

const FormTransaction = (props) => {

  const handleFormClose = () =>{
    props.onHide(false);
  };
  
  return (
    <>
        <Modal show={props.show} onHide={handleFormClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col} controlId="Category">
                <Form.Label>Category</Form.Label>
                <CircleFill />
                <Form.Control
                  type="text"
                  placeholder="Select category"
                  autoFocus
                  readOnly
                />
              </Form.Group>
              <Form.Group className="mb-3" as={Col} controlId="Value">
                <Form.Label>Value</Form.Label>
                <CircleFill />
                <Form.Control
                  type="number"
                  placeholder="0.00"
                  autoFocus
                />
              </Form.Group>
            </Row>
            <Form.Group
              className="mb-3"
              controlId="Account"
            >
              <Form.Label>Account</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">Test Bank Account 1</option>
                <option value="2">Test Bank Account 2</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/dd/yyyy"
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="Notes"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleFormClose} style={{ color: '#2196f3'}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormTransaction;