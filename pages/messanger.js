import React, { useState } from 'react';
import ChatList from '../components/elements/ChatList';

export default function Messanger() {

    return (
      <>
        <div className="container mt-10">
          <div className="prose-xl text-center font-bold"><h1>Chat</h1></div>
          <ChatList/>
        </div>
      </>
    )

}
