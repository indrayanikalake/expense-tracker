import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../Redux/CartStatus';


const Item = ({item}) => {
    const items = useSelector((state)=> state.cartStatus.items);
    console.log(items);
    const dispatch = useDispatch();
    
console.log(item.name);
console.log(item.quantity);
    const handleAdd =()=>{
        dispatch(add(item));
        console.log(item.quantity);
    }

   

  return (
    <div>
        <Card className='w-[250px] gap-5 p-8 h-[250px]'>
      <Typography className='text-white'>{item.name}</Typography>
      <div className='flex flex-row'>
      <Button
      onClick={handleAdd}>+</Button>
      <Button className='text-white'>{item.quantity}</Button>
      <Button className='text-white'>-</Button>
      </div>
      </Card>
    </div>
  )
}

export default Item
