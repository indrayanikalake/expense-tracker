import axios from 'axios'
import React from 'react'

const Profile = async () => {
    const idToken = localStorage.getItem('token');
   const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDz2JJcOPvQ6aZWZ7JSkBxM2wuUziGzq80',{
    idToken
   })
   console.log(response);
  return (
    <div>
      
    </div>
  )
}

export default Profile
