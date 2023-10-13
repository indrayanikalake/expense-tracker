import React from 'react';
import { SectionWrapper } from '../../hoc';

import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { useDispatch, useSelector } from 'react-redux';
import { fadeIn, staggerContainer } from '../../utils/motion';
import {
   
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
  } from "recharts";
import { Link } from 'react-router-dom';
import { toggleCartVisibility } from '../../Redux/CartSlice';

const BarA = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state)=>state.expenses.expenses);

    const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() );

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const lastYear = oneYearAgo.getFullYear();
  const lastMonth = oneMonthAgo.getMonth();
  const lastWeek = oneWeekAgo.getDate();
  console.log(lastMonth,lastWeek,lastYear);
  

  // Calculate expenses for last week, last month, and last year
 

 
  
  const expensesLastYear = Object.values(expenses).filter(
    (expense) => expense.date.split('-')[0] <= lastYear
  );
  
      const expensesLastMonth = Object.values(expenses).filter(
    (expense) =>expense.date.split('-')[0]==2023 && expense.date.split('-')[1] <= lastMonth
  );
  
     const expensesLastWeek = Object.values(expenses).filter(
    (expense) =>expense.date.split('-')[0]==2023 && expense.date.split('-')[1] == lastMonth+1 && expense.date.split('-')[2] <= lastWeek
  );
  

 console.log(expensesLastMonth);
  const totalLastWeek = expensesLastWeek.reduce(
    (total, expense) => total + expense.expense,
    0
  );
  console.log(totalLastWeek);

  const totalLastMonth = expensesLastMonth.reduce(
    (total, expense) => total + expense.expense,
    0
  );
  console.log(totalLastMonth)
  const totalLastYear = expensesLastYear.reduce(
    (total, expense) => total + expense.expense,
    0
  );
  console.log(totalLastYear);
  const data = [
    { name: "lastWeek", collection: totalLastWeek },
    { name: "lastMonth", collection: totalLastMonth },
    { name: "lastYear", collection: totalLastYear },
   
  ];

  return (
    <div className='mt-5'>
        <button  onClick={()=>dispatch(toggleCartVisibility())}
        style={{position:'absolute', top:'0', left:'0', fontSize:'20px', color:'white'}}><Link to='/signIn/expense'>back</Link></button>
        <em className=' mt-10 p-8 blue-text-gradient text-lg font-bold text-[100px]'>Collection</em> <br />
    <div
   
    className='mt-5 flex lg:flex-row'
    
    >
     
      <Tilt className='mt-8 w-[880px] h-[480px]  blue-bangon-gradient '
     
       options={{
          max:45,
          scale:1,
          speed:450
        }}
      >
    <BarChart
    className='mt-8 ml-10 mr-10 mb-8 bg-transparent'
          width={700}
          height={440}
          data={data}
          
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis domain={[0, 8000]}/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="collection" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
   
   
    
    </Tilt>
    <div>
    <button className='green-gradient w-[300px] h-[100px] rounded-[10px]  text-white font-bold'
    
        style={{margin:'3rem 3rem'}}>last Week:<br/>{totalLastWeek}<span className='green-text-gradient font-bold'>$</span></button>
    <button className='green-gradient w-[300px] h-[100px] rounded-[10px]  text-white font-bold'
    
    style={{margin:'0.5rem 3rem'}}>last Month:<br/>{totalLastMonth}<span className='green-text-gradient font-bold'>$</span></button>
     <button className='green-gradient w-[300px] h-[100px] rounded-[10px]  text-white font-bold'
    
    style={{margin:'2.9rem 3rem'}}>last Year<br/>{totalLastYear}<span className='green-text-gradient font-bold'>$</span></button>
  
    </div>   
   
    </div>
    <div className='mt-10 p-8 text-white'>
      <b className='text-lg text-white'>Last week</b>
  <table className="table-auto border-collapse w-full">
  <thead >
    <tr>
      <th className="border p-2">Date</th>
      <th className="border p-2">Description</th>
      <th className="border p-2">Expense</th>
      <th className="border p-2">Category</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(expensesLastWeek)?.map((expenseId) => {
      const expense = expenses[expenseId];
      return (
        <tr key={expenseId} className="text-white bg-transparent">
          <td className="border p-2">{expense.date}</td>
          <td className="border p-2">{expense.description}</td>
          <td className="border p-2">${expense.expense}</td>
          <td className="border p-2">{expense.category}</td>
        </tr>
      );
    })}
  </tbody>
</table>
         <br />
         <br />
         <b className='text-lg text-white'>Last Month</b>
  <table className="table-auto border-collapse w-full ">
  <thead className='black-gradient'>
    <tr className='black-gradient'>
      <th className="border p-2">Date</th>
      <th className="border p-2">Description</th>
      <th className="border p-2">Expense</th>
      <th className="border p-2">Category</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(expensesLastMonth)?.map((expenseId) => {
      const expense = expenses[expenseId];
      return (
        <tr key={expenseId} className="text-white bg-transparent">
          <td className="border p-2">{expense.date}</td>
          <td className="border p-2">{expense.description}</td>
          <td className="border p-2">${expense.expense}</td>
          <td className="border p-2">{expense.category}</td>
        </tr>
      );
    })}
  </tbody>
</table>
         <br />
         <br />
          <b className='text-lg text-white'>Last Year</b>
  <table className="table-auto border-collapse w-full">
  <thead>
    <tr>
      <th className="border p-2">Date</th>
      <th className="border p-2">Description</th>
      <th className="border p-2">Expense</th>
      <th className="border p-2">Category</th>
    </tr>
  </thead>
  <tbody>
    {Object.keys(expensesLastYear)?.map((expenseId) => {
      const expense = expenses[expenseId];
      return (
        <tr key={expenseId} className="text-white bg-transparent">
          <td className="border p-2">{expense.date}</td>
          <td className="border p-2">{expense.description}</td>
          <td className="border p-2">${expense.expense}</td>
          <td className="border p-2">{expense.category}</td>
        </tr>
      );
    })}
  </tbody>
</table>


    </div>
    </div>
  )
}

export default BarA
