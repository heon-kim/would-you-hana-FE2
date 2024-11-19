import React, { useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import "../styles/chatbot.css";
import img_chatbot from "../assets/img/img_chatbot.png";
import IconSend from "../assets/img/icon_send.png";
import IconClose from "../assets/img/icon_close.svg";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

interface ChatbotProps {
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [messages, setMessages] = useState<Message[]>([
    { sender: "bot", text: "무엇을 도와드릴까요?", time: getCurrentTime() },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };
    setMessages([...messages, userMessage]);

    setInput("");

    // 백엔드와 연결하여 메시지를 전송하고 응답을 받아오는 부분
    try {
      const response = await axios.post("http://localhost:8000/get_answer", {
        question: input,
      });

      const botMessage: Message = {
        sender: "bot",
        text: response.data.answer, // 백엔드 응답 메시지 사용
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);

      const errorMessage: Message = {
        sender: "bot",
        text: "서버에 문제가 발생했습니다. 다시 시도해주세요.",
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <Draggable>
      <div className="chatbot-container" style={{ zIndex: 2000 }}>
        <div className="chatbot-header">
          <h3>우주하나 챗봇</h3>
          <button className="close-button" onClick={onClose}>
            <img src={IconClose} />
          </button>
        </div>
        <div className="chatbot-content">
          {messages.map((message, index) => (
            <div key={index} className={`chat-message ${message.sender}`}>
              <div className="message-header">
                {message.sender === "bot" && (
                  <>
                    <img
                      src={img_chatbot}
                      alt="별벗 이미지"
                      className="bot-image"
                    />
                    <span className="bot-name">별벗</span>
                  </>
                )}
                <span className="time">{message.time}</span>
              </div>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="chatbot-footer">
          <div className="input-container">
            <input
              type="text"
              placeholder="무엇이든지 별벗에게 물어보세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-button" onClick={handleSend}>
              <img src={IconSend} />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default Chatbot;
