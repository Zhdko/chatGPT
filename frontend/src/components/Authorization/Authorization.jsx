import { AuthForm } from '../Form/AuthForm/AuthForm';
import './Authorization.css';

export function Authorization({ handleRegister, handleLogin }) {
  return (
    <main className='authorization'>
      <div className='img-container'></div>
      <AuthForm textBtn='Login' onSubmit={handleLogin} />
      <p className='authorization__text'>or sign up if you don’t have an account yet</p>
      <AuthForm textBtn='Sign up' onSubmit={handleRegister} />
    </main>
  );
}
