import { LoginForm } from '@/04_features/auth'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.session.userId);

  useEffect(() => {
    if (userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  return (
    <LoginForm/>
  )
}
