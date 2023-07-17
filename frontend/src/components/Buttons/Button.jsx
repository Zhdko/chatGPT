import './Button.css';

export function Button({ textBtn, isValid }) {
  return (
    <button className='btn btn_action_submit' type='submit' aria-label={textBtn} disabled={!isValid}>
      {textBtn}
    </button>
  );
}
