import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../../Redux/AuthSlice';



const EnterNewpassword = () => {
    const dispatch = useDispatch();
    const [ email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState();
    const {uuid} = useParams();
   
    console.log(uuid);

    const submitHandler =async (e)=>{
          e.preventDefault();
          try{
            setIsLoading(true);
            await dispatch(resetPassword(email,password,uuid));
            setIsLoading(false);
          }catch(error){
            console.log(error);

          }
    }

  return (
    <div>
        {isLoading && <p>Loading....</p>}
      <form onSubmit={submitHandler}>
        <label htmlFor='email'>Enter Registered Email</label>
        <input type='email' required onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor='password'>Enter New Pssword</label>
        <input type='password' required onChange={(e)=>setPassword(e.target.value)} />
        <button type='submit'>update</button>
      </form>
    </div>
  )
}

export default EnterNewpassword
