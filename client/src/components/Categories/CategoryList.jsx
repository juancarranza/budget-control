import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Category from './Category';
import FormCategory from './FormCategory';
import '../../styles/BankAccountList.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const loadCategories = () => {
    Axios.get('http://localhost:3001/api/budget-control/category').then((response)=>{ 
      const lista = response.data.categories;
      setCategories(lista);
      console.log("Bank Accounts: ");
      console.log(categories);
    });
  };
  useEffect( () => loadCategories(),[]);//[] cuando esta vacio significa que se ejecuta cuando se crea/monta el componente (1 sola vez)

  return (
    <>
      <div className='container list-bnk-acc'>
        <Accordion defaultActiveKey="0">
          {
            categories.map(
              (category) =>
                <Category 
                  categoryType = { category.categoryType }
                  name = { category.name } 
                  creation_date = { category.createdAt }
                  description = { category.description }
                  id = { category.id } 
                  key = { category.id }
                  edit ={ category.name === "transfer" ? false : true }
                  loadCategories = {loadCategories}
                />
              
            )//end categories.map
          }     
        </Accordion>
      </div>  
      <FormCategory key="456" loadCategories = {loadCategories} />
    </>
  );
};

export default CategoryList;