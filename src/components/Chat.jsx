import React from 'react'
import "./Chat.css"
import Messages from './Messages'
import Input from './Input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
const Chat = () => {

  const { data} = useContext(ChatContext);
  return (
    <div className='chat'>
      <div className="info">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <i class='bx bxs-video'></i>
        <i class='bx bxs-user-plus'></i>
        <i class='bx bx-dots-horizontal-rounded'></i>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat