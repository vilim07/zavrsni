import React, { useState } from 'react';
import ChatList from '../components/elements/ChatList';
import { Chat } from '../components/elements/Chat';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

export default function Messanger() {

  const [activeChat, setActiveChat] = useState({ id: null });
  const [user, loading, error] = useAuthState(auth);

  const opacity = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  }


  return (
    <>
      {user ? (
        <div className="container lg:mt-10 pb-20">
          <div className="prose-xl text-center font-bold mb-10 hidden lg:block"><h1>Chat</h1></div>
          <motion.div className="flex flex-col lg:flex-row rounded-xl overflow-hidden"
            variants={opacity}
            initial="hidden"
            animate="show">
            <ChatList activeChat={activeChat} setActiveChat={setActiveChat} />
            <Chat chat={activeChat} />
          </motion.div>
        </div>
      ) :
        (
          <div> Loading... </div>
        )}
    </>
  )

}
