import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import { useNavigate } from "react-router-dom";


const Register = () => {

    const [email,setemail]=useState("")
    const [Password,setPassword]=useState("")

    const navigate=useNavigate();

    const HandleRegister= async(e)=>{
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth,email,Password)
            navigate("/")
        }
        catch (err){
            alert(err.massage)
        }
    }
  return (
    <div>
        <div>
            <form onSubmit={HandleRegister}>
                <h2>Registartion Form</h2>
                <input type='email' placeholder='email' onChange={e=>setemail(e.target.value)}/>
                <input type='password' placeholder='password' onChange={e=>setPassword(e.target.value)}/>
                <button type='submit'>submit</button>
            </form>
        </div>      
    </div>
  )
}

export default Register
