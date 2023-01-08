import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';

const Login = () => {
  //state usuario
  const [username, setUsername] = useState("");
  //state password
  const [password, setPassword] =useState("");


  const userNameHandler = (e) =>  {
    setUsername(e.target.value);
    //console.log(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };

  const loginHandlerSubmit = async (e) => {
    e.preventDefault();
    const loginCredentials = {
      username: username,
      password: password
    }

    console.log(loginCredentials);
    Axios.post('http://localhost:3001/api/budget-control/user/login', { loginCredentials }).then((response)=> console.log(response));
  }

  return (
    <div className='d-flex align-items-center justify-content-center login-main'>
        <Card>
          <Card.Body>
            <Card.Title className='text-center'>Login</Card.Title>
            <Form onSubmit={loginHandlerSubmit}>
              <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={userNameHandler}/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={passwordHandler} />
              </Form.Group>
              <div className='d-grip gap-2'>
                <Button variant="primary" type='submit'>Login</Button>
              </div>
            </Form>
          </Card.Body>
          <Alert key='light' variant='light'>
            Need an account? Create an account &nbsp;
            <Alert.Link href="#">here</Alert.Link>
        </Alert>
        </Card>
        
    </div>
  );
};

export default Login;