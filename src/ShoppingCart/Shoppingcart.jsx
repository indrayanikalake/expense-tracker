import { Button, Card, Grid } from '@material-ui/core'
import React from 'react'
import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCartVisibility } from '../Redux/CartSlice';
import Cart from './Cart';

const Shoppingcart = () => {
    const dispatch = useDispatch();
    const isVisible = useSelector((state) =>state.cart.isVisible);
    const items=[
        {
            name:'abc',
            id:1,
            quantity:1,
        },
        {
            name:'def',
            id:2,
            quantity:1,
        },
        {
            name:'efg',
            id:3,
            quantity:1,
        }
    ]
  return (
    <div>
        <Button onClick={()=>dispatch(toggleCartVisibility())}
        className='text-white text-start'
        >Cart</Button>
        {isVisible && (
            <div>
            <p>true</p>
            <Cart />
            </div>
        )}
     <Grid container spacing={4}>
        {items.map((item)=>(
            <Grid key={item.id} xs={12} sm={6} md={4} lg={3} >
               
                    <Item item={item}/>
                
            </Grid>
        ))}
        </Grid> 
    </div>
  )
}

export default Shoppingcart;
