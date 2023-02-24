import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BankAccountList from './components/BankAccount/BankAccountList';
import CategoryList from './components/Categories/CategoryList';
import TransactionList from './components/Transactions/TransactionList';
import Home from './components/dashboard/Home';
import NavBar from './components/dashboard/NavBar';
//import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate= useNavigate();
  const user = useSelector((state) => state.user);

  useEffect( () => {

    if(!user?.isLogged && !localStorage.getItem("budget_token")){
      console.log("here: "+user.isLogged);
      navigate('/login');
    }else{
      navigate('/');
    }

  }, [user?.isLogged]
  );

  return (
    
      <>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <BankAccount /> */}
      {/* <BankAccountList />  */}
      {/* <FormBankAccount /> */}
      <NavBar />
      <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='bank-account' element={<BankAccountList />} />
          <Route path='transaction' element={<TransactionList />} />
          <Route path = 'category' element= {<CategoryList />}  />
      </Routes>
      
    
    </>
  );
}

export default App;
