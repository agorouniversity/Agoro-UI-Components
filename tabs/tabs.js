import { createContext, useContext, useEffect, useState, useId } from 'react';
import { Card } from '../UI';
import './tabs.css';

const Context = createContext({});

const Tab = (props) => {
  return(
    <Card
      className='tab'
      width='full'
    >
      {props.disabled &&
        <div className='disableTab'></div>
      }
      {props.children}
    </Card>
  )
}

const TabBody = (props) => {
  const [children, setChildren] = useState([]);
  const { selected, id } = useContext(Context);

  useEffect(() => {
    if(Array.isArray(props.children)) {
      setChildren(props.children)
    } else {
      setChildren([props.children]);
    }
  }, [props.children])

  return(
    <div
      className='tabBody'
      role='tabpanel'
      id={`tabPanel-${id}-${selected}`}
      aria-labelledby={`tabButton-${id}-${selected}`}
      tabIndex={0}
    >
      {children[selected]}
    </div>
  )
}

const Title = (props) => {
  const [children, setChildren] = useState([]);
  const context = useContext(Context);

  useEffect(() => {
    if(Array.isArray(props.children)) {
      setChildren(props.children)
    } else {
      setChildren([props.children]);
    }
  }, [props.children])

  return(
    <div
      className='titles'
    >
      {children && children.map((title, i) => 
        <Context.Provider
          key={i}
          value={{
            ...context,
            index: i
          }}
        >
          {title}
        </Context.Provider>  
      )}
    </div>
  )
}

const TabTitle = (props) => {
  const { setSelected, index, selected, id } = useContext(Context);

  return(
    <button
      type='button'
      className={`title${selected === index ? ' selected' : ''}`}
      onClick={() => setSelected(index)}
      role='tab'
      id={`tabButton-${id}-${index}`}
      aria-controls={`tabPanel-${id}-${index}`}
      aria-selected={selected === index ? true : false}
      tabindex={selected === index ? 0 : -1}
    >
      {props.children}
    </button>
  )
}

Tabs.TitleBar = Title;
Tabs.Tab = Tab;
Tabs.Body = TabBody;
Tabs.Title = TabTitle;

export function Tabs(props) {
  const [selected, setSelected] = useState(0);
  const id = useId();

  useEffect(() => {
    setSelected(props.selected - 1);
  }, [props.selected])

  return(
    <Context.Provider
      value={{
        selected,
        setSelected,
        id
      }}
    >
      <div
        id={props.id}
        className={`tabs ${props.className || ''}`.trim()}
        role='tablist'
      >
        {props.children}  
      </div>
    </Context.Provider>
  )
}