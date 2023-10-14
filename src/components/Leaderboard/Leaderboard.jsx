import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProgressBar from '../View/ProgressBar';

const Leaderboard = () => {
  const  data  = useSelector((state)=>state.leaderboard.data);
  const [value, setValue] = useState(20000);
  const [success, setSuccess] = useState(false);

  console.log(data);

  useEffect(()=>{
   setInterval(()=>{
    setValue((value)=>value+10000)
   },10)
  },[]);

  return (
    <div>
      {data.map((user,index)=>(
        <div>
        <ul key={index} className='text-white space-x-10 text-lg flex flex-row m-4 mx-4 p-5'>
          <li className='mr-4'>{index}</li>
          <li className='mr-4'>{user.email.split('@')[0]}</li>
          <li className='mr-4'>{user.total_cost}</li>
          <input className='  mr-10 p-1 w-[500px]' type='range' min={0} max={100000} value={user.total_cost} />
          <ProgressBar value={value} max={user.total_cost} onComplete={()=>setSuccess(true)} />
        </ul>
        
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
