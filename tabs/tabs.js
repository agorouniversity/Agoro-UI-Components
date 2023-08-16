import { createContext, useContext, useEffect, useState } from 'react';
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
  const { selected } = useContext(Context);

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
  const { setSelected, index, selected } = useContext(Context);

  return(
    <button
      type='button'
      className={`title${selected === index ? ' selected' : ''}`}
      onClick={() => setSelected(index)}
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

  useEffect(() => {
    setSelected(props.selected - 1);
  }, [props.selected])

  return(
    <Context.Provider
      value={{
        selected,
        setSelected
      }}
    >
      <div
        id={props.id}
        className={`tabs ${props.className || ''}`.trim()}
      >
        {props.children}  
      </div>
    </Context.Provider>
  )
}