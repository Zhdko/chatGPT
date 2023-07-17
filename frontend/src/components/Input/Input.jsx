import './Input.css';

export function Input({ placeholder, name, type, errors, ...props }) {
  return (
    <div className='input'>
      <input
        type={type || name}
        name={name}
        className={`input__field ${errors !== '' && 'input__error'}`}
        placeholder={placeholder || name[0].toUpperCase() + name.slice(1)}
        {...props}
      />
      <span className='error'>{errors}</span>
    </div>
  );
}
