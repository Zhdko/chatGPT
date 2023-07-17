import { NavLink } from 'react-router-dom';
import './Header.css';

export function Header({ isLoggedIn, handleLogout }) {
  return (
    <header className='header'>
      <h1 className='header__title'>Lowfound OpenAI API Chat</h1>
      {isLoggedIn && (
        <NavLink className='link header__link' onClick={handleLogout}>
          Logout
        </NavLink>
      )}
    </header>
  );
}
