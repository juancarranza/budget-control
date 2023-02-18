import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const EditBankAccount = (props) => {

  const user = useSelector((state) => state.user);

  const editClose = () => {
    props.onHide(false);
  };
  
  const [bankAccount, setBankAccount] = useState({
    id: props.bank_account.id,
    name: props.bank_account.name,
    id_currency: props.bank_account.currency.id,
    initial_ammount: props.bank_account.initial_ammount,
    description: props.bank_account.description,
    id_user: user.user.id
  });

  const [currencies, setCurrencies] = useState([]);
  useEffect( () => {
    console.log("un efecto");

    Axios.get('http://localhost:3001/api/budget-control/currency').then((response)=>{ 
      //setCurrencies(response)
      //console.log(response.data);
      setCurrencies(response.data);
      console.log("Currencies edit: ");
      console.log(currencies);
      //console.log(user);
    });
    
  }, [props.show]);

  const handleChange = (e) => {
    setBankAccount({...bankAccount, [e.target.name]:e.target.value});
    console.log("BankAccount: ");
    console.log(bankAccount);
  };

  const handleUpdate = (e) => {
    
    editClose();
    console.log("cuenta de banco:");
    console.log(bankAccount);

    //console.log('ID CURRENCY');
    //console.log(currencies[0].id);
    //console.log("bankAccount");
    //console.log(bankAccount);
    Axios.put('http://localhost:3001/api/budget-control/bank-account/edit', { bankAccount }).then((response)=> {
      props.loadLista()
    });
  };

  // const getCurrencySelect = (bankAccount_currency) =>{
  //   console.log("getCurrencySelect: ");
  //   console.log(bankAccount_currency, currencies);
  //   const [currency] = currencies.filter( (currency_option) => currency_option.id === bankAccount_currency);
  //   if(!currency){
  //     return currencies[0];
  //   }
  //   console.log("return currency: ");
  //   console.log(currency);
  //   return currency.id;
  // };

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
              <Form.Select aria-label="Default select example" onChange={handleChange} name="id_currency" value={bankAccount.id_currency} >
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
                value={bankAccount.initial_ammount}
                onChange={handleChange}
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

export default EditBankAccount;