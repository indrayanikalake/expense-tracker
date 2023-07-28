import React, { useState } from 'react';
import {Grid, Typography, Card } from '@material-ui/core';
import { useDispatch , useSelector } from 'react-redux';
import { increase, remove, decrease } from '../Redux/CartStatus';


const Cart = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cartStatus.items);
    console.log(items.map((item)=>item.newItem));
    const [sending, setSending] = useState(false);
   useEffect (()=>{
    const sendCartdata = async ()=>{
    setSending(true);
    try{
        const response = await axios.post('https://ecommerce-project-88866-default-rtdb.firebaseio.com/cart.json',
        items)
        setSending(false);
        if(response.status === 200){
            console.log('successful');
        }
    }catch(error){
        console.log(error);
    }
    }
   },[items]);
   useEffect(() => {
    // Make the GET request to retrieve cart data
    const fetchCartData = async () => {
      setSending(true);
      try {
        const response = await axios.get(
          'https://ecommerce-project-88866-default-rtdb.firebaseio.com/cart.json'
        );
        if (response.status === 200) {
          const data = response.data;
          if (data) {
            // Populate Redux store with the retrieved data
            dispatch(setCartData(data));
          }
        }
        setLoading(false);
      } catch (error) {
        setError('Error retrieving cart data');
        setLoading(false);
      }
      setSending(false);
    };

    fetchCartData();
  }, [dispatch]);

   if(sending)return <p>sending</p>
   

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
