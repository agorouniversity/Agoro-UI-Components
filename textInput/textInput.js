import './textInput.css';

export const TextInput = (props) => {
  let textInputProps = {
    id: props.id,
    className: `base textInput ${props.width ? props.width + ' ' : '' }${props.className || ''}`.trim(),
    placeholder: props.placeholder,
    type: props.type || 'text',
    required: props.required,
    onChange: props.onChange,
    onFocus: props.onFocus,
    onBlur: props.onBlur,
    name: props.name,
    ref: props.reference,
    autoComplete: props.autoComplete,
    defaultValue: props.defaultValue || '',
    pattern: props.pattern
  }

  const textInputPropsLabel  = {
    ...textInputProps,
    className: `base textInput${props.width === 'medium' || props.width === 'full' ? ' full' : ''}`,
  }

  return (
    <>
    {props.label 
      ? <label
          id={props.id}
          className={`base textInputLabel ${props.width ? props.width : ''} ${props.className ? props.className : ''} `.trim()}
        >
          <span>
            {props.label}
          </span>
          <br></br>
        {props.multiline
          ? <textarea
              {...textInputPropsLabel}
          ></textarea>
          : <input
              disabled={props.disabled}
              {...textInputPropsLabel}
          ></input>
        }
        </label>
      : <>
          {props.multiline
          ? <textarea
              {...textInputProps}
          ></textarea>
          : <input
              {...textInputProps}
          ></input>
        }
        </>
    }
    </>
  );
}