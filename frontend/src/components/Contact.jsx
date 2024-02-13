import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getContactsRoute } from "../utils/APIRoutes";

export default function Contact({ changeChat, currentUser, msgNotification, currentChat }) {
  const [contacts, setContacts] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchContacts() {
      const { data } = await axios.get(
        `${getContactsRoute}/${currentUser._id}`
      );

      if (data.users) {
        setContacts(data.users);
      }
    }
    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser]);

  const handleChat = (user) => {
    setSelectedUser(user);
    changeChat(user);
  };

  const handleLogOut = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };

  useEffect(()=>{
    if(!currentChat){
      setSelectedUser(undefined)
    }
  },[currentChat])

  return (
    <>
      <Container>
        <div className="contain">
          <div className="brand">
            <img src={Logo} alt="Logo Image" />
            <h3>Snappy</h3>
          </div>
          <div className="icon" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faRightFromBracket} className="logoutIcon" />
          </div>
        </div>

        <div className="contact_list">
          {contacts &&
            contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleChat(contact)}
                  className={`userdiv ${
                    selectedUser === contact ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                  />
                  <h3>{contact.username}</h3>
                  {msgNotification &&
                    msgNotification.map((userObj) => {
                      if (userObj._id == contact._id && userObj.count > 0) {
                        return (
                          <span className="notification">
                            <p>{userObj.count}</p>
                          </span>
                        );
                      }
                    })}
                </div>
              );
            })}
        </div>

        <div className="current_user">
          {currentUser && (
            <div className={`currentdiv`}>
              <img
                src={`data:image/svg+xml;base64,${currentUser.avatarImage}`}
              />
              <h3>{currentUser.username}</h3>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  height: 100%;

  .contain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0 1.2rem;

    .icon {
      cursor: pointer;

      .logoutIcon {
        font-size: 24px;
        border-radius: 0.5rem;
        color: #fff;
        padding: 0.5rem;
        background-color: #9a86f3;
      }
    }

    .brand {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      img {
        height: 3rem;
      }
      h3 {
        color: white;
        text-transform: uppercase;
      }
    }
  }

  .contact_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 68vh;
    gap: 0.7rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .userdiv {
      gap: 1rem;
      position: relative;
      display: flex;
      width: 92%;
      cursor: pointer;
      padding: 0.7rem;
      align-items: center;
      background-color: #ffffff34;
      border-radius: 0.2rem;
      transition: 0.4s ease-in-out;

      img {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;
      }
      h3 {
        color: white;
      }
      .notification {
        position: absolute;
        right: 1rem;
        margin-left: 0.2rem;
        height: 2rem;
        width: 2rem;
        background-color: green;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: black;
        font-size: 1rem;
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current_user {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #00000076;

    .currentdiv {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      img {
        height: 4rem;
        width: 4rem;
        border-radius: 50%;
      }
      h3 {
        color: white;
        font-size: larger;
      }
    }
  }

  @media screen and (min-width: 0px) and (max-width: 600px) {
    width: 100vw;
  }

  @media screen and (min-width: 0px) and (max-width: 768px) {
    font-size: 1rem;
    .current_user {
      .currentdiv {
        gap: 0.5rem;
        img {
          height: 3rem;
          width: 3rem;
        }
      }
    }
  }
`;
