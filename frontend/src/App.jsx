import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import SetAvatar from "./pages/SetAvatar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setavatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
