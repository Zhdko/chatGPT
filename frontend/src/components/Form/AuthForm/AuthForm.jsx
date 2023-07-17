import { useValidation } from '../../../hooks/useValidation';
import { Button } from '../../Buttons/Button';
import { Input } from '../../Input/Input';
import './AuthForm.css';

export function AuthForm({ textBtn, onSubmit }) {
  const { values, errors, isValid, handleChange } = useValidation({ email: '', password: '' });

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(values);
  }

  return (
    <form className='form form_action_auth' onSubmit={handleSubmit}>
      <Input name='email' value={values.email} errors={errors.email} onChange={handleChange} />
      <Input name='password' value={values.password} errors={errors.password} onChange={handleChange} minLength='8' />
      <Button textBtn={textBtn} isValid={isValid} />
    </form>
  );
}
