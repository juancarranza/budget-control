import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {actions } from '../../redux/user/user.slice';
import Card from 'react-bootstrap/Card';
import { Chart } from "react-google-charts";
import { useSelector } from 'react-redux';
import Axios from 'axios';
import '../../styles/BankAccount.css';

const Home = () => {

  const user = useSelector((state) => state.user);
  const transaction = {
    id_user: user.user.id
  };
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const loadSummaryTransactions = () => {
    Axios.post('http://localhost:3001/api/budget-control/summaryTransactions', { transaction }).then((response)=>{ 
      const summaryTransactions = response.data;
      console.log(summaryTransactions);
      setIncome(parseFloat(summaryTransactions[0].TOTAL));
      setExpense(parseFloat(summaryTransactions[1].TOTAL*(-1)))
      //const propertyNames = Object.keys(summaryTransactions[0]);
      //console.log("Property Names: ");
      //console.log(propertyNames);
      console.log("Transactions: ");
      console.log(summaryTransactions[0].TOTAL);
    });
  };
  useEffect( () => loadSummaryTransactions(),[])

  const dispatch = useDispatch();
  const data = [
    ["Type", "Ammount"],
    ["Income", income],
    ["Expenses", expense],
  ];

  const options = {
    title: "Income vs Expenses",
    is3D: true,
    //pieHole: 0.2,
  };

  return (
    <> 
    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>Summary</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <div>
          <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"100%"}
            />
        </div>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem'}}>
      <Card.Body>
        <Card.Title>Summary</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
        <Card.Text>
           <div className='d-flex justify-content-between'>
            <div className='big_text_2'>Income</div>    
            <div className={'positive_balance'}>
                {income}
            </div>  
          </div>
          <div className='d-flex justify-content-between'>
            <div className='big_text_2'>Expenses</div>    
            <div className={'negative_balance'}>
                -{expense}
            </div>  
          </div> 

          <div className='d-flex justify-content-between'>
            <div className='big_text_2'>Balance</div>    

            <div className={(income-expense)>=0?'positive_balance':'negative_balance'}>
                <strong>{income-expense}</strong>
            </div>  
          </div> 
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>



    </>
    
  );
};

export default Home;