import React, { useContext, createContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './sidebar.css';

const Context = createContext({});

const Item = (props) => {
  const location = useLocation().pathname.replace(/\/$/, '');
  const ContextRef = useContext(Context);
  const context = Object.keys(ContextRef).length > 0 ? ContextRef : undefined;

  useEffect(() => {
  }, [location])

  const match = () => {
    return((context && `${context.parent}${props.link}` === location) ||
           (!context && location === props.link) ||
           (context && props.link === '/assignments' && location.includes('assignments')) ||
           (context && props.link === '/students' && location.includes('students')))
  }

  return(
    <Link
      id={props.id}
      to={context ? `${context.parent}${props.link}` : props.link}
      className={`${ match() ? 'active ' : ''}${props.className ? props.className : ''}`.trim()}
    >
      {props.children}
    </Link>
  );
}

const SubSection = (props) => {
  return(
    <>
      {props.data &&
        <div
          id={props.id}
          className={`subSection ${props.className ? props.className : ''}`.trim()}
        >
          <hr></hr>
          <h3>{props.data.courseName}</h3>
          <Context.Provider
            value={{
              parent: props.route.replace(':id', props.data.courseID)
            }}
          >
            {props.children}
          </Context.Provider>
        </div>
      }
    </>
  )
}

Sidebar.Item = Item;
Sidebar.SubSection = SubSection;

export function Sidebar(props) {
  return(
    <nav
      id={props.id}
      className={`sidebar ${props.className ? props.className : ''}`.trim()}
    >
      {props.children}
    </nav>
  )
}