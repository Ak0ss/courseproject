import React from 'react'
import './Navbar.css'
import {signOut} from "firebase/auth"
import {auth} from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {

  const {currentuser} = useContext(AuthContext)
  return (
    <div className='navbar'>
      <span className='logo'>ChitChat</span>
      <div className="user">
        <img src={currentuser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar