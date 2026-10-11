import { useState } from 'react';
import Chatbot from './ChatBot';
const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="chatbot-container fixed z-40">
      {isOpen ? (
        <div className="flex flex-col items-end">
          <Chatbot />
          <button type="button" aria-label="Close health assistant" className="chat-button rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" onClick={toggleChatWindow}>
                <img className="rounded-full bg-canopy p-3 transition-transform duration-200 ease-spring hover:scale-105" src="/images/result.svg" alt="" width="64" height="64" />
          </button>
        </div>
      ) : (
        <button type="button" aria-label="Open health assistant" className="chat-button rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-canopy" onClick={toggleChatWindow}>
                <img className="rounded-full bg-canopy p-3 transition-transform duration-200 ease-spring hover:scale-105" src="/images/result.svg" alt="" width="64" height="64" />
        </button>
      )}
    </div>
  );
};

export default ChatBotButton;