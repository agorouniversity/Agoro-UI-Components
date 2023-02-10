import './textInput.css';

export const TextInput = (props) => {
  const newProps = {
    id: props.id,
    className: `base textInput ${props.width ? props.width + ' ' : '' }${props.className || ''}`,
    placeholder: props.placeholder,
    type: props.type || 'text',
    required: props.required,
    onChange: props.onChange,
    defaultValue: props.defaultValue || ''
  }

  return (
    <>
    {props.multiline
      ? <textarea
          {...newProps}
      ></textarea>
      : <input 
          {...newProps}
      ></input>
    }
    </>
  );
}