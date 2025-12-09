import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 从 URL 获取 Token
    const token = searchParams.get('token');

    if (token) {
      // 2. 存入 localStorage
      localStorage.setItem('jwt_token', token);
      
      // 3. 跳转到主页或 Dashboard
      console.log("登录成功，Token已保存");
      navigate('/dashboard'); 
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate]);

  return <div>Login successful! Redirecting...</div>;
};

export default LoginSuccess;