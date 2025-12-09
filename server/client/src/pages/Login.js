import React from 'react';
import './Login.css';

const Login = () => {
  const googleLogin = () => {
    // 后端 API 
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div>
          <h1 className="login-title">CS CareerLink</h1>
          <p className="login-subtitle">
            CS Career 
          </p>
        </div>

        <div>
          <button onClick={googleLogin} className="google-btn">
            <span>Sign in with Google</span>
          </button>
        </div>

        <p className="footer-text">
          &copy; 2025 cs409 OrangeConnect Team 
        </p>

      </div>
    </div>
  );
};

export default Login;