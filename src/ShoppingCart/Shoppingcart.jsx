import { Card, Grid } from '@material-ui/core'
import React from 'react'
import Item from './Item'

const Shoppingcart = () => {
    const items=[
        {
            name:'abc',
            id:1,

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
