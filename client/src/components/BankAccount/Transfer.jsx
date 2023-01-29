import { React, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Axios from 'axios';
import { useSelector } from 'react-redux';


const Transfer = (props) => {

  const user = useSelector((state) => state.user);
  const [bankAccounts, setBankAccounts] = useState([]);

  const transferClose= () => {
    props.onHide(false);
  };

  const [transfer, setTransfer] = useState({
    description: '',
    ammount: 0,
    id_bankaccount_to: '',
    id_bankaccount_from: props.id_origin_acc,
    id_currency_from: props.currency_origin.id,
    exchange_rate_from: props.currency_origin.exchange_rate_from
  });

  const handleChange = (e) => {
    setTransfer({...transfer, [e.target.name]:e.target.value});
    console.log("Transfer: ");
    console.log(transfer);
  };

  const handleTransfer= (e) => {
    e.preventDefault();
    transferClose();
    console.log("VALIDATE TRANSFER: ");
    console.log(transfer);
    Axios.post('http://localhost:3001/api/budget-control/transfer/create', { transfer }).
      then((response)=> {
        console.log(response);
        props.loadLista();
      });

  }

  useEffect(() => {
    if(props.show){
      Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
        const lista=response.data;
        const lista_filtrada=lista.filter((x)=>{
          return x.id !==  props.id_origin_acc && x.id_user === user.user.id;
        });
        setBankAccounts(lista_filtrada);
        console.log("Bank Accounts: ");
        console.log(bankAccounts);
      });
    }
    
  }, [props.show])
  

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
              <Form.Label>From <strong>{props.name_origin_acc}</strong> to:</Form.Label>
              <Form.Select aria-label="Default select example" name="id_bankaccount_to" onChange={handleChange}>
                <option value="none" >Select an Option</option>
                {
                  bankAccounts.map(
                    (bankAccount) => (
                      <option value={bankAccount.id} key={bankAccount.id} >{bankAccount.name + " - "+ bankAccount.symbol}</option>
                      )
                  )
                }
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="transfer.ammount">
              <Form.Label>Transfer Ammount</Form.Label>
              <Form.Control
                type="number"
                placeholder="0.00"
                name="ammount"
                value={transfer.ammount}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            

            <Form.Group
              className="mb-3"
              controlId="transfer.notes"
            >
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={transfer.description} onChange={handleChange} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={transferClose} style={{ color: '#2196f3'}}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTransfer}>
            Save
          </Button>
        </Modal.Footer>
      </Modal> 
    </>
  );
};

export default Transfer;