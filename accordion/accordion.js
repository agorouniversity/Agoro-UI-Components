import {useEffect, useState, createContext, useContext } from 'react';
import './accordion.css';

const Context = createContext({});

/*Accordion item wrapper component*/
const AccordionItem = (props) => {
  const context = useContext(Context);

  return (
    <>
      {context.table
        ? <tbody
            className='section tableSection'
          >
            {props.children}
          </tbody>
        : <div
            className='section'
          >
            {props.children}
          </div>
      }
    </>
  );
}

const AccordionCol = (props) => {
  const context = useContext(Context);

  return(
    <>
      {context.heading
        ? <th
            className='cell'
          >
            {props.children}
          </th>
        : <td
            className='cell'
          >
            {props.children}
          </td>
      }
    </>
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
      if(context.onSelect) {
        context.onSelect(i, !selected);
      }
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
      if(context.onSelect) {
        context.onSelect(i, !selected);
      }
    }
  }

  return (
    <>
      {context.table
        ? <tr
            className={`${props.disabled ? 'disabled ' : ''}section-title tableRow${selected ? ' selected' : ''}`}
            onClick={() => props.disabled ? null : select()}
          >
            {props.children}
            {!props.disabled && <td className='tableArrow'></td>}
          </tr>
        : <div 
            className={`section-title ${context.cv === 'right' ? 'cvright ' : 'cvleft '}${selected ? 'selected' : ''}`.trim()}
            onClick={() => select()}
          >
            {props.children}
          </div>
      }
    </>
  );
}

/*Accordion item body component*/
const AccordionContent = (props) => {
  const context = useContext(Context);

  return(
    <>
      {context.table
        ? <tr
            className={`section-content${context.open[context.index] ? ' selected ' : ' '}`}
          >
            <td 
              className='tableContent'
              colSpan='10'
            >
              <div 
                className='contentRow'
              >
                <br></br>
                {props.children}
                <br></br>
                <br></br>
              </div>
            </td>
          </tr>
        : <div
            className={`section-content${context.open[context.index] ? ' selected' : ''}`}
          >
            <div 
              className='contentRow'
            >
              <br></br>
              {props.children}
              <br></br>
              <br></br>
            </div>
          </div>
      }
    </>
  );
}

const AccordionHeading = (props) => {
  return(
    <thead
      className='headingRow'
    >
      <tr>
        <Context.Provider
          value={{heading: true}}
        >
          {props.children}
        </Context.Provider>
      </tr>
    </thead>
  );
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
Accordion.Col = AccordionCol;
Accordion.Heading = AccordionHeading;

/*Accordion wrapper component*/
export function Accordion (props) {
  const [open, setOpen] = useState({});
  const [start, setStart] = useState(props.selected);
  const [children, setChildren] = useState([]);

  useEffect(() => {
    if(props.children) {
      if(props.table && Array.isArray(props.children)) {
        setChildren([...props.children.flat(1)]);
      } else if(!Array.isArray(props.children)) {
        setChildren([props.children]);
      } else {
        setChildren([...props.children]);
      }
    }
  }, [props.children, props.table]);

  useEffect(() => {
    setStart(props.selected + 1);
  }, [props.selected])

  return (
    <>
      {props.table
        ? <table
            id={props.id}
            className='base accordion table'
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
                        setStart,
                        onSelect: props.onSelect
                      }}
                      key={i}
                    >
                      {x}
                    </Context.Provider>
                  );
                })}
              </>
            }
          </table>
        : <div
            table={props.table}
            id={props.id}
            className='base accordion'
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
      }
    </>
  )
}