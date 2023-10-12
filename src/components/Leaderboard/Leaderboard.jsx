import React from 'react'
import { useSelector } from 'react-redux'

const Leaderboard = () => {
  const  data  = useSelector((state)=>state.leaderboard.data);
  console.log(data);
  return (
    <div>
      {data.map((user,index)=>(
        <div>
        <ul key={index} className='text-white text-lg flex flex-row m-4 mx-4 p-10'>
          <li className='mr-4'>{index}</li>
          <li className='mr-4'>{user.email.split('@')[0]}</li>
          <li className='mr-4'>{user.total_cost}</li>
          <input className='  mr-10 p-1' type='range' value={user.total_cost} />
        </ul>
        
        </div>
      ))}
    </div>
  )
}

export default Leaderboard
