import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import loader from "../assets/loader.gif";

function SetAvatar() {
  const api = `https://api.multiavatar.com/${Math.round(
    Math.random() * 1000000
  )}`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    // hideProgressBar: false,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    } else {
        
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log("data :", data);

      if (data.isSet === true) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Failed to set profile picture", toastOptions);
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      if (user.isAvatarImageSet) {
        navigate("/");
      }
    } else {
      navigate("/register");
    }
  }, []);

  useEffect(() => {
    const data = [];

    async function fetchData() {
      for (let i = 0; i < 2; i++) {
        const imgData = await axios.get(
          `${api}/${Math.round(Math.random() * 10000)}?apikey=ktzu0qLSCOmb7A`
        );
        const buffer = new Buffer(imgData.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          {" "}
          <img src={loader} className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatar-container">
            {avatars &&
              avatars.map((avatar, index) => {
                return (
                  <div
                    key={index}
                    className={`avatar ${
                      selectedAvatar === index ? "selected" : ""
                    }`}
                  >
                    <img
                      src={`data:image/svg+xml;base64,${avatar}`}
                      onClick={() => setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
          </div>

          <button onClick={setProfilePicture}> Set as Profile Picture</button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
const Container = styled.div`
  height: 100svh;
  width: 100vw;
  background-color: #09091d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  .loader {
    height: 20rem;
    width: 20rem;
  }

  .title-container {
    color: white;
  }

  .avatar-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;

    .avatar {
      display: flex;
      border-radius: 50%;
      border: 0.3rem solid transparent;
      padding: 0.3rem;
      outline: none;
      cursor: pointer;
      transition: all 0.4s ease-in-out;

      img {
        height: 5rem;
        width: 5rem;
      }
    }
    .selected {
      border: 0.3rem solid #4e0eff;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    width: 18rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.5s ease-in-out;

    &:hover {
      background-color: #997af0;
    }
  }
`;

export default SetAvatar;
