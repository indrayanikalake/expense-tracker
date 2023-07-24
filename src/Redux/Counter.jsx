import React from 'react';
import { motion } from 'framer-motion';
import { slideIn } from '../utils/motion';
import { styles } from '../styles';
import { useSelector, connect, useDispatch } from 'react-redux';


const Counter = () => {
    const dispatch = useDispatch();
    const counter = useSelector(state=> state.count);

    const increamentHandler = () =>{
        dispatch({type:'INCREMENTBY5'});
    }

    const decreamentHandler = () =>{
        dispatch({type: 'DECREMENTBY5'});
    }

    const toggleCounterHandler = () =>{};

  return (
    <motion.div 
    variants={slideIn('left', 'tween', 0.2, 1)} className='flex-[0.95] text-start  rounded-2xl'
    >
    <form className='mt-2 flex flex-col gap-2'>
      <h1 className={`${styles.heroHeadText} text-center`}>Redux Counter</h1>
      <h3 className='text-center text-white text-medium'>{counter}</h3>
      <div className='flex flex-row items-center justify-center space-x-4px'>
        <button type='button' onClick={increamentHandler}>Increament</button>
        <button type='button' onClick={decreamentHandler}>Decreament</button>
      </div>
      <button type='button' onClick={toggleCounterHandler}>Toggle Counter</button>
    </form>
    </motion.div>
  )
}

export default Counter;
