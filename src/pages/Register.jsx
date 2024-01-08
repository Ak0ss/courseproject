import React from 'react'
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage} from "../firebase";
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Register = () => { 
    const [err,setErr] = useState(false)
    const navigate = useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target[0].value;
        const email= e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].value;

        try {
            const res = await createUserWithEmailAndPassword(auth,email,password)
        
            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable( storageRef, file);
            //Register three observer
            uploadTask.on(
                (error) => {
                    setErr(true);
                }, 
                ()=> {
                    getDownloadURL(uploadTask.snapshot.ref).then (async(downloadURL) => {
                        await updateProfile(res.user,{
                            displayName,
                            photoURL: downloadURL,
                        })
                    });
                }
            )
        } catch(err){
            setErr(true)
        }
    }; 
 return (
   <div className='regContainer'>
       <div className='regWrap'>
           <h1>Chit Chat</h1>
           <h2>Regisztráció</h2>
           <form onSubmit={handleSubmit}>
               <input type="text" placeholder='Név' />
               <input type="email" placeholder='E-mail cím' />
               <input type="password" placeholder='Jelszó'/>
               <input style={{display:"none"}} type="file" id='file'/>
               <label htmlFor="file">
               <i className='bx bx-camera-plus'>
               </i>
               <span>Kép hozzáadása </span>
               </label>
               <button>Sign Up</button>
               {err && <span>Hiba van</span>}
           </form>
           <p>Van már fiók? <Link to="/login">Belépés</Link></p>
       </div>
   </div>
 )
}

export default Register
