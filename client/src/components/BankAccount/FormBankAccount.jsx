import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import '../../styles/FormBankAccount.css';
import { Plus } from 'react-bootstrap-icons';
import { useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const FormBankAccount = ({loadLista}) => {

  const user = useSelector((state) => state.user);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreate = (e) => {
    
    setShow(false);
    console.log("cuenta de banco:");
    console.log(bankAccount);

    //console.log('ID CURRENCY');
    //console.log(currencies[0].id);
    //console.log("bankAccount");
    //console.log(bankAccount);
    Axios.post('http://localhost:3001/api/budget-control/bank-account/create', { bankAccount }).
      then((response)=> {
        console.log(response);
        loadLista()
      });

  }; 

  

  const [bankAccount, setBankAccount] = useState({
    name: '',
    id_currency:'',
    initial_ammount:0,
    description: '',
    id_user: user.user.id
  });

  const handleChange = (e) => {
    setBankAccount({...bankAccount, [e.target.name]:e.target.value});
    console.log("BankAccount: ");
    console.log(bankAccount);
  };

  const [currencies, setCurrencies] = useState([]);
  useEffect( () => {
    

    if(show){
      console.log("un efecto");
      Axios.get('http://localhost:3001/api/budget-control/currency').then((response)=>{ 
        //setCurrencies(response)
        //console.log(response.data);
        setCurrencies(response.data);
        console.log("Currencies: ");
        console.log(currencies);
        //console.log(user);
      });
    }
    
    
  }, [show, currencies.length]);

  return (
    <>
      
      <Button variant="primary" onClick={handleShow} className="new-BkAcc" style={{borderRadius: '60%'}}>
        <Plus  size="lg"/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Bank Account {user.user.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={bankAccount.name}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.Select"
            >
              <Form.Label>Currency</Form.Label>
              <Form.Select aria-label="Default select example" onChange={handleChange} name="id_currency">
                <option value="none" >Select an Option</option>
                { 
                    
                    currencies.map(
                      (currency) => (
                          <option  key={currency.id} value = {currency.id}>{currency.name +" - ("+currency.symbol+")" }</option>
                      )
                    )

                    
                }

              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Initial Ammount</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                name = "initial_ammount"
                onChange={handleChange}
                value={bankAccount.initial_ammount}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={bankAccount.description} onChange={handleChange} name="description" />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose} style={{ color: '#2196f3'}}>
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

export default FormBankAccount;