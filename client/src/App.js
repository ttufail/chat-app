import './App.css';
import Chat from './components/Chat';
import Chatlisttemp from './components/Chatlisttemp';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Useroptions from './components/Useroptions';
import Chatcontainer from './components/Chatcontainer';
import Chatroomcontainer from './components/Chatroomcontainer';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatlisttemp" element={<Chatlisttemp />} />
          <Route path="/useroptions" element={<Useroptions />} />
          <Route path="/chatcontainer" element={<Chatcontainer />} />
          <Route path="/chatroomcontainer" element={<Chatroomcontainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
