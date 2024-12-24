import React, { useRef, useState } from "react";
import axios from "axios";
import Draggable from "react-draggable";
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
  const draggableRef = useRef<HTMLDivElement>(null);

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
  const [typingMessage, setTypingMessage] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

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
    <Draggable nodeRef={draggableRef}>
      <div  ref={draggableRef} className="chatbot-container w-[380px] bg-[#f5f5f5] rounded-2xl font-sans shadow-lg relative z-[2000]">
        <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-[#1A7CFF] via-[#7DE3EC] to-[#E1F4C0] text-white font-bold text-base rounded-t-2xl">
          <h3>우주하나 챗봇</h3>
          <button onClick={onClose}>
            <img src={IconClose} alt="Close" />
          </button>
        </div>

        <div className="h-[430px] p-2.5 bg-white overflow-y-auto font-light">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col my-2.5 ${message.sender === "bot" ? "items-start" : "items-end"
                }`}
            >
              <div className="flex items-center">
                {message.sender === "bot" && (
                  <>
                    <img
                      src={img_chatbot}
                      alt="별벗 이미지"
                      className="w-[37px] mr-1.5 rounded-full"
                    />
                    <span className="text-black font-bold text-sm mr-1.5">별벗</span>
                  </>
                )}
                <span className="text-xs text-gray-400">{message.time}</span>
              </div>
              <p
                className={`text-sm max-w-[80%] rounded-lg px-2.5 py-2 ml-[35px] ${message.sender === "bot"
                  ? "bg-gray-100 text-black"
                  : "bg-[#1F81FE] bg-opacity-80 text-white"
                  }`}
              >
                {message.text}
              </p>
            </div>
          ))}
          {isTyping && (
            <div className="flex flex-col my-2.5 items-start">
              <div className="flex items-center">
                <img
                  src={img_chatbot}
                  alt="별벗 이미지"
                  className="w-[37px] mr-1.5 rounded-full"
                />
                <span className="text-black font-bold text-sm mr-1.5">별벗</span>
                <span className="text-xs text-gray-400">{getCurrentTime()}</span>
              </div>
              <p className="text-sm max-w-[80%] rounded-lg px-2.5 py-2 ml-[35px] bg-gray-100">
                {typingMessage}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white p-2.5 rounded-b-2xl">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="무엇이든지 별벗에게 물어보세요!"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="w-full px-4 py-2.5 pr-12 rounded-full bg-gray-100 text-sm outline-none text-black font-light"
            />
            <button
              className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-[#1F81FE] bg-opacity-80 text-white p-2 rounded-full w-[30px] h-[30px] flex items-center justify-center"
              onClick={handleSend}
            >
              <img src={IconSend} alt="Send" />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
//
export default Chatbot;
