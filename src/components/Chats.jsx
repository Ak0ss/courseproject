import React from 'react'
import "./Chats.css"
import { useState } from 'react'
import { useEffect } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { useContext } from 'react';
import { ChatContext } from '../context/ChatContext';
const Chats = () => {

  const [chats, setChats] = useState([]);
  const {currentUser} = useContext(AuthContext)
  const [dispatch] = useContext(ChatContext)
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = () => {
    dispatch({type: "change user", payload: u})
  }

  console.log(chats)
  return (
    <div className='chats'>
      {Object.entries(chats)?.sort((a,b)=>a[1].date - b[1].date).map((chat) => {
      <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}>
        <img src={chat[1].userInfo.photoURL} alt=''/>
        <div className="userChatInfo">
          <span>{chat[1].userInfo.displayName}</span>
          <p>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
    })}
    </div>
  )
}

export default Chats