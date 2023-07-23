import React, {useRef, useState } from 'react';
import { styles } from '../../styles';
import axios from 'axios';

const ResetPassword = () => {
    const emailRef = useRef();
    const [ error ,setError] = useState(false);
    const [ loading, setLoading] = useState(false);
    const [sent, SetSent] =useState(false);

    const handleSubmit = async ()=>{
        const email = emailRef.current.value;
       
        try{
            console.log('wait');
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
             requestType:"PASSWORD_RESET",
             email
            });
            console.log(response);
    
            if(response.status === 200){
                SetSent(true);
            }

        }catch(error){
            console.log(error);
            setError('something went wrong');
        }
    }

  return (
    <>
    {!sent && (
    <form className='flex flex-col items-center justify-center mt-20 p-8'>
        <label className='flex flex-col items-center justify-center p-10'>
      <span className={`${styles.sectionSubText}`}>enter the email with which you have registered.</span>
       <input
       type='email'
       name='email'
       ref={emailRef} 
       placeholder='enter your email...'
       required/>
      </label>
      <button type='button' 
      onClick={handleSubmit}>Send Link</button>
    </form>
    )}
    {sent && 
    <p> Thank You We've successfuly sent Verification E-mail , click on link and set your new password</p>}
    {error && <p>{error}</p>}
    </>
  )
}

export default ResetPassword
