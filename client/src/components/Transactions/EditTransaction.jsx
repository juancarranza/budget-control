import { React, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import { Plus } from 'react-bootstrap-icons';
import '../../styles/FormTransaction.css';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const EditTransaction = (props) => {

  const [transaction, setTransaction] = useState({
    id: props.transaction.id,
    ammount: props.transaction.ammount, 
    id_category: props.transaction.id_category,
    id_bankaccount: props.transaction.id_bankaccount,
    type: props.transaction.type
  });

  const handleChange = (e) => {
    setTransaction({...transaction, [e.target.name]:e.target.value});
    console.log("Transaction: ");
    console.log(transaction);
  };

  const handleClose = () =>{
    props.onHide(false)
  };

  //----load Categories--------------
  const [categories, setCategories] = useState([]);
  useEffect(()=>{
    if(props.show){
      Axios.get('http://localhost:3001/api/budget-control/category').then(
        (response)=>{
          const lista=response.data.categories;
          const lista_category= lista.filter( (x) => {return x.categoryType === transaction.type && x.name!== 'transfer';});
          setCategories(lista_category);
        }
      );
    }

  }, [props.show]);

  //----load BankAccounts------
  const user = useSelector((state) => state.user);
  const [bankAccounts, setBankAccounts]=useState([]);
  useEffect(()=>{
    if(props.show){
      Axios.get('http://localhost:3001/api/budget-control/bank-account').then((response)=>{ 
        const lista = response.data;
        const lista_user = lista.filter( (x) => {return x.id_user === user.user.id;});
        setBankAccounts(lista_user);
        console.log("Bank Accounts: ");
        console.log(bankAccounts);
      });
    }
  },[props.show]);

  
  // const resetValues = () =>{
  //   setTransaction(
  //     {
  //       id: '',
  //       ammount: '', 
  //       id_category: '',
  //       id_bankaccount: '',
  //       type: ''
  //     }
  //   );
  // };

  //-------Save Transaction--------
  const saveTransaction = () =>{
    console.log("Transaction: ");
    console.log(transaction);
    Axios.put('http://localhost:3001/api/budget-control/transaction/update', { transaction })
    .then((response)=> {
      console.log(response);
      props.loadTransactions();
    });
    handleClose();
    //resetValues();
  }

  return (
    <>
    <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Edit {transaction.type[0].toUpperCase() + transaction.type.substring(1)}</Modal.Title>
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
                
                {
                categories.map(
                    (category)=>
                    <option value={category.id} key={category.id}>{category.name}</option>
                )//end categories.map
                }
            </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" as={Col} controlId="Value">
            <Form.Label>Value</Form.Label>
            
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
                {
                bankAccounts.map(
                    (account) =>
                    <option value={account.id} key={account.id}>{account.name}</option>
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
        <Button variant={transaction.type==='income'?'success':'danger'} onClick={saveTransaction}>
            Save
        </Button>
        </Modal.Footer>
    </Modal>
</>
  );
};

export default EditTransaction