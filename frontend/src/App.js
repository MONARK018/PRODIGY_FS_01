import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedPage from './components/ProtectedPage';
import Logout from './components/Logout';

function App() {

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Router>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path="/login" element={<Login />} />
         <Route path="/protected" element={localStorage.getItem('token') ? <ProtectedPage /> : <Navigate to="/login" />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
