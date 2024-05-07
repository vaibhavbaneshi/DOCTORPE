import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import "./Chatbot.css";
import "./loader.css";
import { useMutation } from "@tanstack/react-query";

const sendMessageAPI = async (message) => {
  const res = await axios.post("https://doctorpe-backend.vercel.app/api/v1/chatbot/ask", { message });
  return res.data;
};

const Chatbot = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [isAITyping, setIsAITyping] = useState(false);
  const [alert, setAlert] = useState(false);
  const [conversation, setConversation] = useState(() => {
    // Load conversation history from local storage if available
    const storedConversation = localStorage.getItem("conversation");
    return storedConversation ? JSON.parse(storedConversation) : [{
      role: "assistant",
      content: "Hello! How can I assist you today?",
    }];
  });

  const mutation = useMutation({
    mutationFn: sendMessageAPI,
    onSuccess: (data) => {
      setIsAITyping(false);
      if (data.message === "") {
        setConversation((prevConversation) => [
          ...prevConversation,
          { role: "assistant", content: "Sorry but I can't answer that question." },
        ]);
      } else {
        setConversation((prevConversation) => [
          ...prevConversation,
          { role: "assistant", content: data.message },
        ]);
      }
    },
    onError:()=>{
      setIsAITyping(false);
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: "assistant", content: "Sorry but I can't answer that question." },
      ]);
    }
  });

  const handleSendMessage = () => {
    const currentMessage = message.trim();
    if (!currentMessage) {
      setAlert(true);
      return;
    }
    setAlert(false);
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: "user", content: currentMessage },
    ]);

    setIsAITyping(true);

    mutation.mutate(currentMessage);

    setMessage("");
  };

  useEffect(() => {
    // Save conversation history to local storage whenever it changes
    localStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  return (
    <>
      <div className="chat-container shadow-2xl">
        <div className="conversation bg-black bg-opacity-50 shadow-2xl">
          {conversation.map((entry, index) => (
            <div key={index} className={`message ${entry.role}`}>
              <strong>{entry.role === "user" ? <div className="text-black">You</div> : <div className="img-container"><img className="chat-icon" src="images/dpe3w.png" alt="DoctorPe icon" /><p className="chatbot-p">Doctorपे</p></div>}</strong>
              <div >{entry.content}</div>
            </div>
          ))}
          {isAITyping && (
            <div className="message assistant">
              <div className="flex">
                <div className="loader">
                  <li className="ball"></li>
                  <li className="ball"></li>
                  <li className="ball"></li>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="input-area">
          <input
            type="text"
            placeholder="Ask your questions"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className={`input-message rounded-xl ${message.trim() === "" && alert ? "border-red-500" : ""}`}
          />
          <button
            onClick={handleSendMessage}
            disabled={mutation.isPending}
            className="send-btn bg-blue-450"
          >
            {mutation.isPending ? <IoSend className="icon-spin" /> : <IoSend />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;