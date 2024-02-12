import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { messageAddRoute, messageGetRoute } from "../utils/APIRoutes";

export default function ChatBox({
  currentChat,
  currentUser,
  isBackClick,
  socket,
}) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    const { data } = await axios.post(messageAddRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
    socket.current.emit("send-message", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgSelf = [...messages, { message: msg, fromSelf: true }];
    setMessages(msgSelf);

    if (data.status) {
      console.log("Message sent");
    } else {
      console.log("Message not sent");
    }
  };

  useEffect(() => {
    async function fetchMsg() {
      const { data } = await axios.post(messageGetRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });

      if (data) {
        setMessages(data);
      }
    }
    if (currentChat && currentUser) {
      fetchMsg();
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (msg) => {
        if(msg.from == currentChat._id){
          setArrivalMessage({ fromSelf: false, message: msg.message });
        }
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="brand">
          <FaArrowLeft
            className={`back ${currentChat ? "makeBlock" : "makeNone"}`}
            onClick={() => isBackClick(true)}
          />
          <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} />
          <h3>{currentChat.username}</h3>
        </div>
        <div></div>
      </div>

      <div className="chat-message">
        {messages &&
          messages.map((msg, index) => {
            return (
              <div
                key={index}
                ref={scrollRef}
                className={`message ${msg.fromSelf ? "sended" : "received"}`}
              >
                <div className="content">
                  <p>{msg.message}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className="chat-input">
        <ChatInput handleSendMsg={handleSendMsg} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  height: 100%;

  .chat-header {
    display: flex;
    padding: 1rem;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      .back {
        color: white;
        display: none;
        cursor: pointer;
      }
      img {
        height: 3rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
    
  }

  .chat-message {
    background-color: #00000076;
    height: 68vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb{
        background-color: #ffffff39;
        border-radius: 1rem;
        width: 0.1rem;
      }
    }

    .message {
      max-width: 60%;
      .content {
        padding: 0.8rem 0.9rem;
        border-radius: 1rem;
        overflow-wrap: break-word;
        font-size: 1.1rem;
        color: white;
      }
    }
    .sended {
      align-self: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      align-self: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
  .chat-input {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (min-width: 0px) and (max-width: 768px) {
    .chat-message {
      height: 75vh;
      .message {
        max-width: 75%;
      }
    }
  }

  @media screen and (min-width: 0px) and (max-width: 600px) {
    .makeBlock {
      display: block;
    }
    .makeNone {
      display: none;
    }
    .chat-header {
      .brand {
        .back {
          display: block;
        }
      }
    }
  }
`;
