import {useEffect, useState, createContext, useContext } from 'react';
import './accordion.css';

const Context = createContext({});

/*Accordion item wrapper component*/
const AccordionItem = (props) => {
  const context = useContext(Context);

  return (
    <div
      className={`section${context.table ? ' tableSection' : ''}`}
    >
      {props.children}
    </div>
  );
}

const AccordionCol = (props) => {
  return(
    <td>
      {props.children}
    </td>
  )
}

/*Accordion item header component*/
const AccordionTitle = (props) => {
  const [selected, setSelected] = useState(false);
  const context = useContext(Context);
  let i = context.index;

  useEffect(() => {
    if(context.default === context.index) {
      setSelected(true);
      let tmp = {}
      tmp[i] = true;
      context.setOpen(tmp);
      context.setStart(null);
    } else if(!context.multi && !context.open[i]) {
      setSelected(false);
    }
  }, [context, i])

  const select = () => {
    if(context.open[i]) {
      let tmp = {...context.open};
      tmp[i] = false;
      context.setOpen(tmp);
      setSelected(!selected);
      return;
    }
    if(!selected && !context.open[i]) {
      let tmp;
      if(!context.multi) {
        tmp = {}
        tmp[i] = true;
        context.setOpen(tmp);
      } else {
        tmp = {...context.open};
        tmp[i] = true;
        context.setOpen(tmp);
      }
      setSelected(!selected);
    }
  }

  return (
    <div 
      className={`section-title ${context.table ? 'tableRow ' : (context.cv === 'right' ? 'cvright ' : 'cvleft ') }${selected ? 'selected' : ''}`.trim()}
      onClick={() => select()}
    >
      {props.children}
      {context.table &&
        <td className='tableArrow'></td>
      }
    </div>
  );
}

/*Accordion item body component*/
const AccordionContent = (props) => {
  const context = useContext(Context);

  useEffect(() => {
  }, [context.open])

  return(
    <div className={`section-content ${context.open[context.index] ? 'selected' : ''}`.trim()}>
      <td colspan={2}>
        {props.children}
      </td>
    </div>
  );
} 

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
Accordion.Col = AccordionCol;

/*Accordion wrapper component*/
export function Accordion (props) {
  const [open, setOpen] = useState({});
  const [start, setStart] = useState(props.selected);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if(!Array.isArray(props.children)) {
      setChildren([props.children]);
    } else {
      setChildren([...props.children]);
    }
  }, [props.children])

  return (
    <div
      className={`base accordion${props.table ? ' table' : ''}`}
    >
     
      {children.length > 0 && 
        <>
          {children.map((x, i) => {
            return(
              <Context.Provider 
                value={{
                  index: i,
                  default: start,
                  multi: props.multi || false,
                  open: open,
                  cv: props.arrow,
                  table: props.table,
                  setOpen,
                  setStart
                }}
                key={i}
              >
                {x}
              </Context.Provider>
            );
          })}
        </>
      }
      </div>
    
  )
}