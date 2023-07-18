import { useValidation } from '../../../hooks/useValidation';
import { Button } from '../../Buttons/Button';
import { Input } from '../../Input/Input';
import './MessageForm.css';

export function MessageForm({ onSubmit }) {
  const { values, errors, isValid, handleChange } = useValidation({ question: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values.question);
  }

  return (
    <form className='form form_action_message' onSubmit={handleSubmit}>
      <textarea
        name='question'
        value={values.question}
        onChange={handleChange}
        placeholder='Type your message here...'
        type='textarea'
        required
        className='input__message'
      />
      <Button textBtn='Send' isValid={isValid} />
    </form>
  );
}
