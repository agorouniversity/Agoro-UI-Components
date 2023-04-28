import { useState, useEffect, useContext, createContext } from "react"
import './checkBox.css';
import '../radio/radio.css';

const Context = createContext({});

const CheckBoxItem = (props) => {
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
          className={props.className || ''}
          name={`${context.name}${context.index}`}
          type='checkbox'
          value={props.value}
          defaultChecked={context.selected}
          onChange={context.onChange}
          disabled={props.disabled}
        >
        </input>
        <span className='checkmark'>
          <span className='checkmarkContainer'>
            <div className="checkmarkBg">
            <div className="checkmarkStem"></div>
            <div className="checkmarkKick"></div>
            </div>
          </span>
        </span>
    </label>
  )
}

CheckBox.Item = CheckBoxItem;

export function CheckBox (props) {
  const [children, setChildren] = useState([]);

  const selected = (i) => {
    if(Array.isArray(props.selected)) {
      return props.selected.includes(i);
    }
    return props.selected === i;
  }

  useEffect(() => {
    if(!Array.isArray(props.children)) {
      setChildren([props.children]);
    } else {
      setChildren([...props.children]);
    }
  }, [props.children, props.selected])

  return(
    <div
      key={props.selected}
      className={`base radio${props.className ? ' ' + props.className : ''}`}
      id={props.id || ''}
    >
      {children.length > 0 &&    
        <>
          {children.map((x, i) => {
            return(
              <Context.Provider
                value={{
                  name: props.name,
                  id: `${props.name}-checkItem-${i}`,
                  index: i,
                  onChange: props.onChange,
                  selected: selected(i)
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