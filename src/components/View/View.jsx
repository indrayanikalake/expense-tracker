import React, { useRef , useState} from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, slideIn } from '../../utils/motion';
import { SectionWrapper } from '../../hoc';
import { styles } from '../../styles';
import axios from 'axios';

const View = () => {
    const userName = useRef();
    const photoUrl = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit =async (e) =>{
     e.preventDefault();
     const name = userName.current.value;
     const photo = photoUrl.current.value;
     
     setLoading(true);
     try{
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
            name,
            photo,
            returnSecureToken:true,
        })
        if(response.success === 200){
            console.log('Done');
            enteredEmail.current.value='';
            enteredPassword.current.value='';
            confirmPassword.current.value='';
        }
     }catch(error){
        console.log(error);
        setError(error);
     }


    }

  return (
    
    <div>
      <h1 className='text-white text-start'>Winners never quit, Quiters never win</h1>
      <h1 className='text-white text-end'>Your Profile is 64% completed, A couple profile has higher
      chances of landing a job 
      <Link to='/view'>Complete now</Link></h1>
      <h3 className={`${styles.heroHeadText}`}>Contact Details.</h3>
      <motion.div
      variants={fadeIn("up","tween",0.2,1)}>
      
     <form onSubmit={handleSubmit}>
        <label>
            <span>Full name:</span>
            <input
             type='text'
             name='name'
             ref={userName}
             placeholder='Your name please..'
             required
            />
        </label>
        <label>
            <span>Profule photo url</span>
            <input
             type='text'
             name='name'
             ref={photoUrl}
             placeholder='Your profile url..'
             required
            />
        </label>
        <button type='submit'>update</button>
     </form>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(View, 'view');
