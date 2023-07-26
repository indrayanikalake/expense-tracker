import { Button, Card, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { add, remove } from '../Redux/CartStatus';


const Item = ({item}) => {
    const dispatch = useDispatch;

    const handleAdd =()=>{
        dispatch(add(item));
    }

    const handleRemove = () =>{
        dispatch(remove(item.id));
    }

  return (
    <div>
        <Card className='w-[250px] gap-5 p-8 h-[250px]'>
      <Typography className='text-white'>{item.name}</Typography>
      <div className='flex flex-row'>
      <Button
      onClick={handleAdd}>+</Button>
      <Button className='text-white'>{item.quantity}</Button>
      <Button className='text-white'
      onClick={handleRemove}>-</Button>
      </div>
      </Card>
    </div>
  )
}

export default Item
