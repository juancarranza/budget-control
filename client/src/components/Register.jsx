import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import {React, useState} from 'react';


const Register = () => {

  const [usuario, setUsuario] = useState({
    first_name:'',
    last_name:'',
    email:'',
    password:'',
  });

  //state that validates if the confirm password is the same
  const [confirmPasswordAlert, setConfirmPasswordAlert] = useState({
    variant: '',
    mensaje: ''
  });


  const handleChange = (e) => {
    setUsuario({...usuario, [e.target.name]:e.target.value});
  };

  const handleChangeConfirm =(e) =>  {
    usuario.password === e.target.value?setConfirmPasswordAlert(
      {variant: 'success', mensaje: 'Password fields match!'}
      ):setConfirmPasswordAlert(
        {variant: 'success', mensaje: 'Error, password fields does not match!'}
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(usuario);
  };

  
  return (
    <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
        <Card>
          <Card.Body>
          <Card.Title className='text-center'>Register</Card.Title>
          <Form className="register-form" onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control placeholder="Enter first name" name="first_name" onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control placeholder="Enter last name" name="last_name" onChange={handleChange}/>
                </Form.Group>
              </Row>
              <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}/>
              </Form.Group>
              <Row className="mb-3">
              {confirmPasswordAlert && <Alert variant={confirmPasswordAlert.variant}>{confirmPasswordAlert.mensaje}</Alert>}
                <Form.Group as={Col} controlId="formGridPassword1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}/>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="Confirm" name="confirm_password" onChange={handleChangeConfirm} />
                </Form.Group>
              </Row>

              <Button variant="primary" type="submit">
                Create
              </Button>
          </Form>
          </Card.Body>
        </Card>
    </div>
  );
};

export default Register;