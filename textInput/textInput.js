import './textInput.css';

export const TextInput = (props) => {
  return (
    <input 
      id={props.id}
      className={`base textInput ${props.width ? props.width + ' ' : '' }${props.className || ''}`}
      placeholder={props.placeholder}
      type={props.type || 'text'}
      required={props.required}
      onChange={props.onChange}
      defaultValue={props.defaultValue || ''}
    ></input>
  );
}