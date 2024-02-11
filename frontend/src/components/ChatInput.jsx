import React, { useState,useRef } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({ handleSendMsg }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");
  const inputRef = useRef();

  const handleEmojiClick = () => {
    setShowEmoji(!showEmoji);
  };
  const handleEmojiSelect = (emojiObject, e) => {
    e.stopPropagation();
    setMsg((prev)=>prev+emojiObject.emoji);
    inputRef.current.scrollLeft = inputRef.current.scrollWidth;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="emoji">
        <BsEmojiSmileFill onClick={handleEmojiClick} />
        {showEmoji ? (
          <Picker
            className="picker"
            onEmojiClick={(emoji, e) => handleEmojiSelect(emoji, e)}
          />
        ) : null}
      </div>
      <form className="input-container" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="send">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  padding: 0 2rem;

  .emoji {
    font-size: 1.8rem;
    color: yellow;
    cursor: pointer;

    .picker {
      position: absolute;
      bottom: 16%;
      background-color: #080420;
      box-shadow: 0 5px 10px #9a86f3;
      border-color: #9a86f3;
      *::-webkit-scrollbar {
        background-color: #080420;
        width: 5px;
        &-thumb {
          background-color: #9a86f3;
        }
      }

      h2 {
        background-color: #080420;
      }

      input {
        background-color: transparent;
        border-color: #9a86f3;
      }
      *:before {
        background-color: #080420;
      }
    }
  }

  .input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: #ffffff34;
    border-radius: 2rem;
    border: none;
    input {
      height: 3rem;
      border-radius: 2rem;
      width: 90%;
      border: none;
      padding: 0 1rem;
      font-size: 1.5rem;
      color: white;
      background-color: transparent;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }

    .send {
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      color: lightwhite;
      background-color: #9a86f3;
      font-size: 2rem;
      cursor: pointer;
      border: none;
    }
  }
  @media screen and (min-width: 0px) and (max-width: 768px) {
    .emoji{
      .picker{
        bottom: 12%;
      }
    }
  }

  @media screen and (min-width: 0px) and (max-width: 600px) {
    gap: 0.5rem;
    padding: 0 1rem;
    .input-container {
      input {
        font-size: 1rem;
      }
      .send {
        font-size: 1.5rem;
        padding: 0.3rem 1.2rem;
      }
    }
  }
`;
