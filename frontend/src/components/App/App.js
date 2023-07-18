import { useState } from 'react';
import { Header } from '../Header/Header';
import './App.css';
import { Authorization } from '../Authorization/Authorization';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import * as auth from '../../utils/auth';
import { Chat } from '../Chat/Chat';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  const { pathname } = useLocation();

  function getUserInfo() {
    auth
      .getUserInfo()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => console.log(err));
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        getUserInfo();
        navigate('/chat', { replace: true });
      })
      .catch((err) => console.log(err));
  }

  function handleLogout() {
    auth
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate('/', { replace: true });
        localStorage.clear();
      })
      .catch((err) => console.log(err));
  }

  function tokenCheck() {
    if (localStorage.getItem('isAuth')) {
      auth
        .getUserInfo()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            if (pathname === '/signin' || pathname === '/signup') {
              navigate('/', { replace: true });
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleMessage(question) {
    console.log(question);
  }

  return (
    <div className='page'>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path='/' element={<Authorization handleRegister={handleRegister} handleLogin={handleLogin} />} />
        <Route path='/chat' element={<Chat onSubmit={handleMessage} />} />
      </Routes>
    </div>
  );
}

export default App;
