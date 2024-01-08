import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { signInWithEmailAndPassword} from "firebase/auth"
const Login = () => {
    const [err,setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email= e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email,password)
       navigate("/")
        } catch(err) {
            setErr(true)
        }
    }
 return (
   <div className='regContainer'>
       <div className='regWrap'>
           <h1>Chit Chat</h1>
           <h2>Belépés</h2>
           <form onSubmit={handleSubmit}>
               <input type="email" placeholder='E-mail cím' />
               <input type="password" placeholder='Jelszó'/>
               <button>Belépés</button>
               {err && <span>HIba van belépéskor</span>}
           </form>
           <p>Nincs fiók? <Link to="/register">Regisztrálj!</Link></p>
       </div>
   </div>
 )
}

export default Login
