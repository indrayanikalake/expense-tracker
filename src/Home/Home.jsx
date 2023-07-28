import React from 'react'
import { expense } from '../assets'
import { styles } from '../styles'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <video className='video rounded-[50px]'
      src={expense} alt='home' muted autoPlay={true} loop />
       <div className='slidesOverlay '>
          <h4 className={`${styles.heroHeadText} p-8 text-start bg-transparent`}>Expense-Tracker</h4>
        
          <button className='w-[100px] h-[50px] bg-transparent'
          onClick={()=>navigate('/signIn')}>Sign In</button>
         </div>
    </div>
  )
}

export default Home
