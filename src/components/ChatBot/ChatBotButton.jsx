import React, { useState } from 'react';
import Chatbot from './ChatBot';
// import './ChatBotButton.css'

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container fixed bottom-10 right-16">
      {isOpen ? (
        <div className="chat-window">
          <Chatbot onClose={toggleChatWindow} />
          <button className="close-button " onClick={toggleChatWindow}>
            <div className='w-24 h-24 ml-64 bg-slate-100 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500 rounded-full'>
                    <img className='rounded-full' src="../images/aichatbot.jpg" alt="" />
            </div>
          </button>
        </div>
      ) : (
        <button className="chat-button" onClick={toggleChatWindow}>
           <div className='w-24 h-24 bg-slate-100 hover:cursor-pointer hover:shadow-2xl hover:shadow-cyan-500 rounded-full'>
                <img className='rounded-full' src="../images/aichatbot.jpg" alt="" />
           </div>
        </button>
      )}
    </div>
  );
};

export default ChatBotButton;
