import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap';//Adding Bootstrap
import '../styles/Login.css';
import 'bootstrap-icons/font/bootstrap-icons.css';//Adding Bootstrap icons

const Login = () => {
  //state usuario
  const [username, setUsername] = useState("");
  //state password
  const [password, setPassword] =useState("");

  const userNameHandler = (e) =>  {
    setUsername(e.target.value);
    //console.log(e.target.value);
  };

  const passwordHander = (e) => {
    setPassword(e.target.value)
  };

  const loginHandler = (e) => {
    e.preventDefault();
    const loginCredentials = {
      usuario: username,
      clave: password
    }

    console.log(loginCredentials);
  }

  return (
    <div className='container global'>
      <div className="card login-form">
        <div className='card-body'>
          <i className="bi bi-person-circle login-logo"></i>
          <div className='card-text'>
            <form onSubmit={loginHandler}>
              <div className='form-group'>
                <label htmlFor='inputEmail'>Email Address</label>
                <input type='email' 
                  className='form-control form-control-sm'
                  id="inputUsername"
                  placeholder="Usuario"
                  onChange={userNameHandler}
                  
                />
                </div>
                <div className='form-group'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input type='password' 
                    className='form-control form-control-sm'
                    id="inputPassword"
                    placeholder="Password"
                    onChange={passwordHander}
                    
                  />
                  </div>
                  <button className='form-control btn btn-primary btn-user btn-block' type='submit'>
                    Sign In
                  </button>
                
                <div className='signup'>
                  Don't have an account? <a href="#">Create One</a>
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>  
    
  );
};

export default Login;