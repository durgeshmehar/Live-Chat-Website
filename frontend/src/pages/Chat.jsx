import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";
import { host } from "../utils/APIRoutes"
import { io } from "socket.io-client";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
    console.log("currentChat :", currentChat);
  };
  const isBackClick = (value) => {
    if(value){
      setCurrentChat(undefined);
    }
  }

  useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Container>
        <div className="container">
          <div className={`contact_chat ${currentChat ? "makeNone":"makeBlock"}`}>
            <Contact changeChat={handleChangeChat} currentUser={currentUser} />
          </div>

          <div className={`messageBox ${currentChat ? "makeBlock":"makeNone"}`}>
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatBox currentChat={currentChat} currentUser={currentUser} isBackClick={isBackClick} socket = {socket}/>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  background-color: #131324;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    height: 90vh;
    width: 90vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 35% 65%;
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    .container {
      grid-template-columns: 35% 65%;
    }
  }

  @media screen and (min-width: 0px) and (max-width: 768px) {
    .container {
      grid-template-columns: 40% 60%;
      height: 100vh;
      width: 100vw;
    }
  }
  @media screen and (min-width: 0px) and (max-width: 600px) {
    .container {
      grid-template-columns: 100%;
    }
    .messageBox {
      display: none;
    }

    .makeBlock {
      display: block;
    }
    .makeNone {
      display: none;
    }
  }
`;

export default Chat;
