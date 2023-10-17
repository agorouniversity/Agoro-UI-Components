import { useState, useEffect, useContext, createContext } from "react"
import './radio.css';

const Context = createContext({});

const RadioItem = (props) => {
  const context = useContext(Context);

  return (
    <label 
        className='base radioItem'
        htmlFor={context.id}
      >
        <span
          className='label'
        >
          {props.children}
        </span>
        <input
          id={context.id}
          className={props.className}
          name={context.name}
          type='radio'
          value={props.value}
          defaultChecked={context.selected}
          onChange={context.onChange}
          disabled={props.disabled}
          required={context.required}
        >
        </input>
        <span className='radiomark'></span>
    </label>
  )
}

Radio.Item = RadioItem;

export function Radio (props) {
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if(!Array.isArray(props.children)) {
      setChildren([props.children]);
    } else {
      setChildren([...props.children]);
    }
  }, [props.children])

  return(
    <div
      className={`base radio${props.className ? ' ' + props.className : ''}`}
      id={props.id}
      key={props.selected}
    >
      {children.length > 0 &&    
        <>
          {children.map((x, i) => {
            return(
              <Context.Provider
                value={{
                  name: props.name,
                  id: `${props.name}-${props.id || 'radioItem'}-${i}`,
                  onChange: props.onChange,
                  selected: props.selected === i ? true : false,
                  required: props.required
                }}
                key={i}
              >
                {x}
              </Context.Provider>
            )
          })}
        </>
      }
    </div>
  );
}