import { MessageForm } from '../Form/MessageForm/MessageForm';
import './Chat.css';

export function Chat({ onSubmit }) {
  return (
    <main className='chat'>
      <div className='chat__history'></div>
      <MessageForm onSubmit={onSubmit} />
    </main>
  );
}
