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
  const [typingMessage, setTypingMessage] = useState<string>(""); // 타이핑 중인 메시지
  const [isTyping, setIsTyping] = useState<boolean>(false); // 타이핑 애니메이션 상태

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    // 챗봇 응답 처리
    try {
      const response = await axios.post("http://localhost:8000/get_answer", {
        question: input,
      });

      const botMessageText = response.data.answer; // 응답 텍스트
      startTypingEffect(botMessageText); // 타이핑 효과 시작
    } catch (error) {
      console.error("Error fetching bot response:", error);

      const errorMessageText = "서버에 문제가 발생했습니다. 다시 시도해주세요.";
      startTypingEffect(errorMessageText); // 타이핑 효과로 에러 메시지 출력
    }
  };

  const startTypingEffect = (text: string) => {
    setTypingMessage(""); // 초기화
    setIsTyping(true); // 타이핑 상태 활성화
    let currentIndex = 0;

    const interval = setInterval(() => {
      setTypingMessage((prev) => prev + text[currentIndex]); // 한 글자씩 추가
      currentIndex++;

      if (currentIndex === text.length) {
        clearInterval(interval); // 모든 글자가 출력되면 중지
        setIsTyping(false); // 타이핑 종료
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text, time: getCurrentTime() },
        ]); // 완성된 메시지를 추가
      }
    }, 50); // 글자 출력 속도 (밀리초)
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
          {isTyping && (
            <div className="chat-message bot">
              <div className="message-header">
                <img
                  src={img_chatbot}
                  alt="별벗 이미지"
                  className="bot-image"
                />
                <span className="bot-name">별벗</span>
                <span className="time">{getCurrentTime()}</span>
              </div>
              <p>{typingMessage}</p> {/* 현재 타이핑 중인 메시지 */}
            </div>
          )}
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
