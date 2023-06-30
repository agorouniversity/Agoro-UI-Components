import { useContext, createContext } from 'react';
import './table.css';

const Context = createContext({});

const Row = (heading, props) => {
  return(
    <tr
      id={props.id}
      className={`${heading ? 'heading ' : 'items '} ${props.className ? props.className : ''}`.trim()}
    >
      <Context.Provider
        value={{
          heading: heading,
          onClick: props.onClick
        }}
      >
        {props.children}
      </Context.Provider>
    </tr>
  );
}

const Col = (props) => {
  const context = useContext(Context);

  return(
    <>
      {!context.heading
        ? <td
            id={props.id}
            className={props.className}
            onClick={context.onClick}
          >
            {props.children}
          </td>
        : <th
            id={props.id}
            className={props.className}
          >
            <h3>
              {props.children}
            </h3>
          </th>
      }
    </>
  )
}

Table.Row = Row.bind(null, false);
Table.Col = Col;
Table.Heading = Row.bind(null, true)

export function Table(props) {
  return(
    <div
      id={props.id}
      className={`tableList ${props.width ? props.width : ''} ${props.className ? props.className : ''}`.trim()}
    >
      <table
      >
        <tbody>
          {props.children}
        </tbody>
      </table>
      </div>
  );
}