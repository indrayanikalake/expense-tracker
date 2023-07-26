import React from 'react';
import {Grid, Typography, Card } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import { increase, remove, decrease } from '../Redux/CartStatus';


const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cartStatus.items);
    console.log(items.map((item)=>item.newItem));

   

  return (
    <div className='w-[850px] h-[600px]'>
     
        {items.map((item)=>(
            <div className='flex flex-row gap-10 p-8 text-white'>
            <p className='text-white text-start'>{item.newItem.name}</p>
            <div className='flex flex-row'>
                <button onClick={()=>dispatch(increase(item.newItem.id))}>+</button>
            <p>{item.newItem.quantity}</p>
            <button onClick={()=>dispatch(decrease(item.newItem.id))}>-</button>
            </div>
            <button onClick={()=>dispatch(remove(item.newItem.id))}>Remove</button>
            </div>
        ))}
        
    </div>
  )
}

export default Cart;
