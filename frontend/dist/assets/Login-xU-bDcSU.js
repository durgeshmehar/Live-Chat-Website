import{r as m,u as b,j as r,L as w}from"./index-xG9N923x.js";import{u as j,a as v,l as y}from"./APIRoutes-CD2Mv1Ah.js";import{L as S}from"./logo-NteK9A7I.js";import{l as k,Q as L,B as n}from"./loader-BN07q9gM.js";function z(){const[i,g]=m.useState({username:"",password:""}),[p,l]=m.useState(!1),t={position:"bottom-right",autoClose:3e3,pauseOnHover:!0,closeOnClick:!0,draggable:!0,theme:"dark"},a=b();m.useEffect(()=>{const e=JSON.parse(localStorage.getItem("chat-app-user"));console.log("user localstorage :",e),e&&e.isAvatarImageSet===!1?a("/setavatar"):e&&e.email&&a("/")},[]);const f=()=>{const{username:e,password:c}=i;return e.length<3?(n.error("Username must be at least 3 characters long",t),!1):c.length<5?(n.error("Password must be at least 6 characters long",t),!1):!0},h=async e=>{if(l(!0),e.preventDefault(),f()){const{username:c,password:x}=i;try{const{data:s}=await v.post(y,{username:c,password:x});if(s.status===!1)n.error(s.msg,t);else{localStorage.setItem("chat-app-user",JSON.stringify(s.user));const o=await JSON.parse(localStorage.getItem("chat-app-user"));o&&o.isAvatarImageSet===!1?a("/setavatar"):o&&o.email&&a("/")}l(!1)}catch{n.error("Internal Server Error ,Try again",t),l(!1)}}},d=e=>{g({...i,[e.target.name]:e.target.value})};return r.jsxs(r.Fragment,{children:[p?r.jsx(u,{children:r.jsx("img",{src:k,className:"loader"})}):r.jsx(u,{children:r.jsxs("form",{onSubmit:e=>h(e),children:[r.jsxs("div",{className:"brand",children:[r.jsx("img",{src:S,alt:"Logo Image"}),r.jsx("h1",{children:"Snappy"})]}),r.jsx("input",{type:"text",placeholder:"Username",name:"username",onChange:e=>d(e)}),r.jsx("input",{type:"password",placeholder:"Password",name:"password",onChange:e=>d(e)}),r.jsx("button",{type:"submit",children:"Login"}),r.jsxs("span",{children:["Create an account? ",r.jsx(w,{to:"/register",children:"   Register"})," "]})]})}),r.jsx(L,{})]})}const u=j.div`
  height: 100svh;
  width: 100vw;
  background-color: #09091d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loader {
    height: 20rem;
    width: 20rem;
  }
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
      h1 {
        font-size: 1.5rem;
      }
    }
    input,
    button {
      width: 70vw !important;
      padding: 0.5rem;
      margin-block: 0.8rem;
      font-size: 0.9rem;
    }
    span {
      font-size: 0.8rem;
    }
  }
`;export{z as default};
