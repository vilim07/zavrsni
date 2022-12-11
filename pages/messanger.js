import React, { useState } from 'react';
import ChatList from '../components/elements/ChatList';
import { Chat } from '../components/elements/Chat';
import { useEffect } from 'react';
export default function Messanger() {

  const [activeChat, setActiveChat] = useState(null);


  return (
    <>
      <div className="container mt-10">
        <div className="prose-xl text-center font-bold"><h1>Chat</h1></div>
        <div className="flex">
          <ChatList setActiveChat={setActiveChat} />
          {activeChat ?(
            <Chat chat={activeChat}/>
          ):(
            "waiting"
          )}
        </div>
      </div>
    </>
  )

}
