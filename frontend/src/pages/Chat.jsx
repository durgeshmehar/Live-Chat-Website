import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Contact from "../components/Contact";
import styled from "styled-components";
import Welcome from "../components/Welcome";
import ChatBox from "../components/ChatBox";
import { host } from "../utils/APIRoutes";
import { io } from "socket.io-client";

function Chat() {
  const [latestSocket , setLatestSocket] = useState(null);
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [msgNotification, setMsgNotification] = useState([]);

  const handleNotification = (userID) => {
    setMsgNotification((prev) => {
      const updatedNotification = prev.map((userObj) => {
        if (userObj._id === userID) {
          return { ...userObj, count: userObj.count + 1 };
        }
        return userObj;
      });

      if (!updatedNotification.some((userObj) => userObj._id === userID)) {
        updatedNotification.push({ _id: userID, count: 1 });
      }

      return updatedNotification;
    });
  };

  const removeNotification = (userID) => {
    console.log("removeNotification userID :", userID);
    let curr = msgNotification.filter((userObj) => userObj._id != userID);
    console.log("removeNotification curr :", curr);
    setMsgNotification(curr);
  };

  const handleChangeChat = (chat) => {
    setCurrentChat(chat);
    console.log("currentChat :", currentChat);
  };
  const isBackClick = (value) => {
    if (value) {
      setCurrentChat(undefined);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      const socket = io(host);
      socket.on("connect_error", (err) => {
        console.log(`Connection error frontend: ${err.message}`);
      });
      socket.emit("add-user", currentUser._id);
      setLatestSocket(socket);
    }
    //cloase the connection
    return () => {
      if (latestSocket && latestSocket.readyState === WebSocket.OPEN) {
        latestSocket.close();
      }
    };
  }, [currentUser]);

  useEffect(() => {
    if (latestSocket) {
      latestSocket.on("receive-message", (msg) => {
           handleNotification(msg.from);
      });
    }
  }, [latestSocket]);

  return (
    <>
      <Container>
        {console.log("connected host :", host)}
        <div className="container">
          <div
            className={`contact_chat ${currentChat ? "makeNone" : "makeBlock"}`}
          >
            <Contact
              changeChat={handleChangeChat}
              currentUser={currentUser}
              msgNotification={msgNotification}
              currentChat={currentChat}
            />
          </div>

          <div
            className={`messageBox ${currentChat ? "makeBlock" : "makeNone"}`}
          >
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatBox
                currentChat={currentChat}
                currentUser={currentUser}
                isBackClick={isBackClick}
                socket={latestSocket}
                handleNotification={handleNotification}
                removeNotification={removeNotification}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  height: 100svh;
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
      height: 100svh;
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
