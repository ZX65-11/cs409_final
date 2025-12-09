import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import LoginSuccess from './pages/LoginSuccess';

// 一个简单的 Dashboard 组件用于测试
const Dashboard = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    // 测试调用受保护的 API
    fetch('http://localhost:5000/api/current_user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem('jwt_token');
    window.location.href = '/login';
  };

  if (!user) return <div>Loading user data...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.displayName}!</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;