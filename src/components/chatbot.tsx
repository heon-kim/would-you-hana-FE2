import React, { useState } from "react";
import "../styles/chatbot.css";
import { Modal } from "antd";
import img_chatbot from "../assets/img/img_chatbot.png";
import Send from "../assets/img/Send.png";

interface Message {
  sender: "bot" | "user";
  text: string;
  time: string;
}

const Chatbot: React.FC = () => {
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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = {
      sender: "user",
      text: input,
      time: getCurrentTime(),
    };
    setMessages([...messages, userMessage]);

    setInput("");

    setTimeout(() => {
      const botMessage: Message = {
        sender: "bot",
        text: `이것은 자동 응답입니다: ${input}`,
        time: getCurrentTime(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <>
      <button onClick={showModal}>챗봇 열기</button> {/**챗봇 여는 버튼 임시 */}
      <Modal
        title={
          <div className="chatbot-header">
            우주하나 챗봇
            <button onClick={handleCancel} className="close-button">
              X
            </button>
          </div>
        }
        visible={isModalVisible}
        footer={null}
        centered
        closable={false} // 기본 닫기 버튼 숨기기
      >
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
              <img src={Send} alt="전송" className="send-icon" />
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Chatbot;
