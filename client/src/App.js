import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BankAccount from './components/BankAccount/BankAccount';
import BankAccountList from './components/BankAccount/BankAccountList';
import FormBankAccount from './components/BankAccount/FormBankAccount';
import TransactionList from './components/Transactions/TransactionList';
import Home from './components/dashboard/Home';
import NavBar from './components/dashboard/NavBar';
//import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';

function App() {
  return (
    <Provider store={store}>
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <BankAccount /> */}
      {/* <BankAccountList />  */}
      {/* <FormBankAccount /> */}

      <Login />

      {/* <Routes> 
        <Route path='/' element={<NavBar />} >
          <Route index element={<Home />} />
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='bank-account' element={<BankAccountList />} />
          <Route path='transaction' element={<TransactionList />} />
        </Route>
      </Routes> */}
      
    </Provider>
  );
}

export default App;
