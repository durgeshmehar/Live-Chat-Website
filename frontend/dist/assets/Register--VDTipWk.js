import{r as d,u as b,j as e,L as w}from"./index-xG9N923x.js";import{u as j,a as y,r as v}from"./APIRoutes-CD2Mv1Ah.js";import{L as k}from"./logo-NteK9A7I.js";import{l as C,Q as L,B as a}from"./loader-BN07q9gM.js";function N(){const[i,g]=d.useState({username:"",email:"",password:"",confirm_password:""}),[f,l]=d.useState(!1),t={position:"bottom-right",autoClose:3e3,pauseOnHover:!0,closeOnClick:!0,draggable:!0,theme:"dark"},u=b();d.useEffect(()=>{localStorage.getItem("chat-app-user")&&u("/")},[]);const h=()=>{const{username:r,email:m,password:o,confirm_password:c}=i;return r.length<3?(a.error("Username must be at least 3 characters long",t),!1):m.length<5?(a.error("Email must be at least 5 characters long",t),!1):o.length<5?(a.error("Password must be at least 6 characters long",t),!1):o!==c?(a.error("Password and confirm password must be same",t),!1):!0},x=async r=>{if(l(!0),r.preventDefault(),h()){const{username:m,email:o,password:c}=i;try{const{data:n}=await y.post(v,{username:m,email:o,password:c});n.status===!1?a.error(n.msg,t):(localStorage.setItem("chat-app-user",JSON.stringify(n.user)),u("/setavatar")),l(!1)}catch{a.error("Failed to create user,Try again",t),l(!1)}}},s=r=>{g({...i,[r.target.name]:r.target.value})};return e.jsxs(e.Fragment,{children:[f?e.jsx(p,{children:e.jsx("img",{src:C,className:"loader"})}):e.jsx(p,{children:e.jsxs("form",{onSubmit:r=>x(r),children:[e.jsxs("div",{className:"brand",children:[e.jsx("img",{src:k,alt:"Logo Image"}),e.jsx("h1",{children:"Snappy"})]}),e.jsx("input",{type:"text",placeholder:"Username",name:"username",onChange:r=>s(r)}),e.jsx("input",{type:"text",placeholder:"Email",name:"email",onChange:r=>s(r)}),e.jsx("input",{type:"password",placeholder:"Password",name:"password",onChange:r=>s(r)}),e.jsx("input",{type:"password",placeholder:"Confirm Password",name:"confirm_password",onChange:r=>s(r)}),e.jsx("button",{type:"submit",children:"Create User"}),e.jsxs("span",{children:["Already have an account? ",e.jsx(w,{to:"/login",children:"   Login"})," "]})]})}),e.jsx(L,{})]})}const p=j.div`
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
`;export{N as default};
