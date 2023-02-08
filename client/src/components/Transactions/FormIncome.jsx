import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CircleFill } from 'react-bootstrap-icons';
import { Plus } from 'react-bootstrap-icons';
import '../../styles/FormBankAccount.css';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const FormIncome = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [transaction, setTransaction] = useState({
    ammount:'',
    description:'',
    id_category:'',
    id_bankaccount:''
  });
  const handleChange = (e) => {
    setTransaction({...transaction, [e.target.name]:e.target.value});
    console.log("Income: ");
    console.log(transaction);
  };

  //----load Categories--------------
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    if(show){
      Axios.get('http://localhost:3001/api/budget-control/category').then(
        (response)=>{
          const lista=response.data.categories;
          const lista_category= lista.filter( (x) => {return x.categoryType === 'income';});
          setCategories(lista_category);
        }
      );
    }

  }, [show]);

  //----load BankAccounts------
  const user = useSelector((state) => state.user);
  const [bankAccounts, setBankAccounts]=useState([]);
  useEffect(()=>{
    if(show){
      Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
        const lista = response.data;
        const lista_user = lista.filter( (x) => {return x.id_user === user.user.id;});
        setBankAccounts(lista_user);
        console.log("Bank Accounts: ");
        console.log(bankAccounts);
      });
    }
  },[show]);

  return (
    <>
        <Button variant="success" onClick={handleShow} className="new-BkAcc" style={{borderRadius: '60%'}}>
          <Plus  size="lg"/>
        </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            
            <Form.Group
              className="mb-3"
              controlId="category.Select"
            >
              <Form.Label>Category</Form.Label>
              <Form.Select 
                aria-label="Default select category" 
                onChange={handleChange} 
                name="id_category"
                value={transaction.id_category} 
              >
                <option value="none" >Select an Option</option>
                {
                  categories.map(
                    (category)=>
                      <option value={category.id}>{category.name}</option>
                  )//end categories.map
                }
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="Value">
              <Form.Label>Value</Form.Label>
              <CircleFill />
              <Form.Control
                type="number"
                placeholder="0.00"
                name="ammount"
                value={transaction.ammount}
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
            
            <Form.Group
              className="mb-3"
              controlId="Account"
            >
              <Form.Label>Account</Form.Label>
              <Form.Select aria-label="Default select Account"
                onChange={handleChange} 
                name="id_bankaccount"
                value={transaction.id_bankaccount}
              >
                <option value="none" >Select an Option</option>
                {
                  bankAccounts.map(
                    (account) =>
                      <option value={account.id} >{account.name}</option>
                  )//end bankaccounts
                }
              </Form.Select>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="Notes"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                name="description"
                value={transaction.description}
                onChange={handleChange} 
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose} style={{ color: '#2196f3'}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormIncome;