import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 3000,
    // hideProgressBar: false,
    pauseOnHover: true,
    closeOnClick: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chat-app-user"));
    console.log("user localstorage :", user);
    if (user && user.isAvatarImageSet === false) {
      navigate("/setavatar");
    } else if (user && user.email) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    const { username, password } = values;
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long", toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error("Password must be at least 6 characters long", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      console.log("submited :", values);
      const { data } = await axios.post(loginRoute, {
        username: username,
        password: password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
        console.log("data in login false:", data);
      } else {
        console.log("data :", data);
        await localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));

        if (user && user.isAvatarImageSet === false) {
          navigate("/setavatar");
        } else if (user && user.email) {
          navigate("/");
        }
      }
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Container>
        {/* {console.log("registerRoute :", registerRoute)} */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="Logo Image" />
            <h1>Snappy</h1>
          </div>

          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Create an account? <Link to="/register"> &nbsp; Register</Link>{" "}
          </span>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #09091d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }

  .brand {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    display: flex;
    flex-direction: column;
    border-radius: 0.4rem;
    color: white;
    font-size: 1rem;
    margin-block: 1rem;
    width: 100%;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    width: 100%;
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

  span {
    color: white;
    text-transform: uppercase;
    display: block;
    text-align: center;
    margin-top: 1rem;

    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }

  @media (max-width: 600px) {
    form {
      padding: 2rem 4vw;
    }
    .brand {
      img {
        height: 2rem !important;
      }
      h1{
        font-size: 1.5rem;
      }
    }
    input,button{
      width:70vw !important; 
      padding:0.5rem;
      margin-block: 0.8rem;
      font-size: 0.9rem;
    }
    span{
      font-size: 0.8rem;
    }
  }
`;

export default Login;
