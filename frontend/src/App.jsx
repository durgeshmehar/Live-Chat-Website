import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";

const Chat = lazy(() => import("./pages/Chat"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() =>  import("./pages/Register"));
const SetAvatar = lazy(() => import("./pages/SetAvatar"));

function App() {
  return (
      <Suspense fallback={<></>}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setavatar" element={<SetAvatar />} />
            <Route path="/" element={<Chat />} />
          </Routes>
        </Router>
      </Suspense>
  );
}

export default App;
