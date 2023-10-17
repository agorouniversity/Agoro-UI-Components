import { useEffect, useState } from 'react';
import './textInput.css';

export const TextInput = (props) => {
  const tmpProps = {
    ...props,
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
    title: props.title,
    autoComplete: props.autoComplete,
    defaultValue:
      (props.defaultValue !== null && props.defaultValue !== undefined)
        ? props.defaultValue
        : '',
    pattern: props.pattern,
    readOnly: props.readOnly
  }

  const [textInputProps, setTextInputProps] = useState({ ...tmpProps })

  const [textInputPropsLabel, setTextInputPropsLabel] = useState({
    ...tmpProps,
    className: `base textInput${props.width === 'medium' || props.width === 'full' ? ' full' : ''}`,
  })

  useEffect(() => {
    if(props.value) {
      setTextInputProps({ ...textInputProps, value: props.value });
      if(props.label) {
        setTextInputPropsLabel({ ...textInputPropsLabel, value: props.value });
      }
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [props.value, props.label])

  return (
    <>
    {props.label 
      ? <label
          id={props.id}
          className={`base textInputLabel ${props.width ? props.width : ''} ${props.className ? props.className : ''} `.trim()}
          title={props.title}
        >
          <span title={props.title}>
            {props.label}
          </span>
          <br></br>
        {props.multiline
          ? <textarea
              {...textInputPropsLabel}
          ></textarea>
          : <input
              aria-labelledby={props.id}
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
              aria-label={props.ariaLabel}
              {...textInputProps}
          ></input>
        }
        </>
    }
    </>
  );
}