import api from './api';

interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const res = await api.post('/auth/login', data);
  localStorage.setItem('token', res.data.access_token);
  return res.data;
};

export const signup = async (data: SignupData) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');

export const isLoggedIn = () => !!getToken();