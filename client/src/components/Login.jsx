import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Axios from 'axios';
import { login } from '../redux/user/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";


const Login = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
    //Axios.post('http://localhost:3001/api/budget-control/user/login', { loginCredentials }).then((response)=> console.log(response));

    dispatch(
      login(loginCredentials)

    );

  }


  useEffect(()=>{
    console.log(user);
    if(user?.error !== undefined){
      alert(user?.error.message);
    }
  }, [user?.error]);


  useEffect( () => {

    if(!user?.isLogged){
      console.log("here: "+user.isLogged);
      navigate('/login');
    }else{
      navigate('/');//go to Home (Dashboard)
    }

  }, [user?.isLogged]
  );

  return (
    <>
      {user?.loading && <p>loading...</p>}
      <div className='d-flex align-items-center justify-content-center login-main'>
          <Card>
            <Card.Body>
              <Card.Title className='text-center'>Login</Card.Title>
              <Form onSubmit={loginHandlerSubmit}>
                <Form.Group className="mb-3" >
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" onChange={userNameHandler} value={username}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" onChange={passwordHandler} value={password} />
                </Form.Group>
                <div className='d-grip gap-2'>
                  <Button variant="primary" type='submit'>Login</Button>
                </div>
              </Form>
            </Card.Body>
            <Alert key='light' variant='light'>
              Need an account? Create an account &nbsp;
              <Alert.Link as={Link} to="/register">here</Alert.Link>
            </Alert>
          </Card>
      </div>
    </>
  );
};

export default Login;