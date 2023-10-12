import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem('token');


const paymentSlice = createSlice({
    name:"payment",
    initialState:{
        paymentSuccess:false
    },
    reducers:{
        updatePaymentStatus(state, action){
            state.paymentSuccess= action.payload
        }
    }
});

export const {updatePaymentStatus} = paymentSlice.actions;
const paymentSliceReducer = paymentSlice.reducer;
export default paymentSliceReducer;


export const openRazorpay = (data) =>{
return async (dispatch, getState) =>{
     console.log("open razor pay function is calling");
     var options = {
      key: data.data.key_id, 
      amount: Number(data.data.amount),
      currency: "INR",
      name: "Expense Tracker",
      description: "Test Transaction",
      image: "https://i.ibb.co/8cDgdFX/Logo.png",
      order_id: data.data.id,
      handler:async function (response) {
        try {
          const res =   await fetch('http://localhost:7000/verifypayment',{
                method:'POST',
                body:JSON.stringify(response),
                headers: {
                     "Authorization":`Bearer ${token}`,
                    "Content-Type": "application/json",
                  },
            })
            if(res){
                dispatch(updatePaymentStatus(true));
            }
           
            console.log(res,'36 open razorpay')
        } catch (error) {
           console.log(error) 
        }
      },
      prefill: {
        name: "Test Kumar",
        email: "test.kumar@example.com",
        contact: "7038870136",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
}
}

export const paymentHandler = ()=>{

    return async(dispatch, getState)=>{
        console.log(token);
        const config = {
            headers:{
                Authorization: `Bearer ${token}`,
                "Content-Type":"application/json",
            }
        }
        try{
            console.log('hi');
            const response = await axios.post('http://localhost:7000/payment', config );
            console.log("response",response);
            dispatch(openRazorpay(response));

        }catch(error){
           console.log(error);
        }
    }
}