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
  handleNotification,
  removeNotification,
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
    socket.emit("send-message", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
      time: new Date(),
    });

    const msgSelf = [
      ...messages,
      { message: msg, fromSelf: true, time: new Date() },
    ];
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
      removeNotification(currentChat._id);
    }
  }, [currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (msg) => {
        if (msg.from == currentChat._id) {
          setArrivalMessage({
            fromSelf: false,
            message: msg.message,
            time: msg.time,
          });
        }
      });
    }
  }, [socket]);


  useEffect(() => {
    if (arrivalMessage) {
      setMessages((prev) => [...prev, arrivalMessage]);
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function getTime(givenDate) {
    let date = new Date(givenDate);
    let options = {
      hour: "numeric",
      minute: "numeric",
    };
    let localTime = date.toLocaleTimeString("en-US", options);
    return localTime.toUpperCase();
  }

  return (
    <Container>
    {console.log("currentChat status:", currentChat)}
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
                <div className="time">
                  <p>{getTime(msg.time)}</p>
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
    gap: 1.2rem;
    padding: 1rem 2rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
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
      .time {
        text-align: right;
        color: white;
        opacity: 0.5;
        margin-top: 0.2rem;
        font-size: 0.9rem;
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
      position: sticky;
      top: 0;
      left: 0;
      .brand {
        .back {
          display: block;
        }
      }
    }
  }
`;
