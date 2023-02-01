import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Category from './Category';
import FormCategory from './FormCategory';
import '../../styles/BankAccountList.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const CategoryList = () => {
  return (
    <>
      <div className='container list-bnk-acc'>
        <Accordion defaultActiveKey="0">
          <Category 
            categoryType= 'expense'
            name= 'fuel' 
            creation_date= '01/31/2023'
            description = 'Fuel Expense'
            id= '1' 
            key= '1'
            edit={true}
          />
        </Accordion>
      </div>  
      <FormCategory key="123456" />
    </>
  );
};

export default CategoryList;