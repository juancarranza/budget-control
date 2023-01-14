import React from 'react';
import { useDispatch } from 'react-redux';
import {actions } from '../../redux/user/user.slice';

const Home = () => {

  const dispatch = useDispatch();

  return (
    <div onClick={ () => {
      console.log("click")
      dispatch(actions.logout())
    }}>Logout!!</div>
    
  );
};

export default Home;