import { createContext, useContext, useEffect, useState } from 'react';
import { useMatches } from 'react-router-dom';
import { Loading } from '../UI';
import './frame.css';

const Context = createContext({});

const Sidebar = (props) => {
  const { mobileSidebar, closeSidebar } = useContext(Context);

  return(
    <div
      onClick={() => closeSidebar()}
      className={`frameSidebar${mobileSidebar}`}
    >
      {props.children}
    </div>
  )
}

const Body = (props) => {
  const [crumbs, setCrumbs] = useState(undefined);
  const matches = useMatches();
  const { openSidebar } = useContext(Context);

  useEffect(() => {
    setCrumbs(matches
      .filter((match) => Boolean(match.handle?.crumb))
      .map((match) => match.handle.crumb(match.data)));
  },[matches])

  return(
    <div
      className={`frameBody ${props.className || ''}`.trim()}
    >
      <div
        className='pageHeading'
      >
        <div
          className='titleBar'
        >
          <button 
            onClick={() => openSidebar()}
          >
            <svg viewBox="0 0 100 80" width="2rem" height="3rem">
              <rect width="100" height="0.6rem"></rect>
              <rect y="30" width="100" height="0.6rem"></rect>
              <rect y="60" width="100" height="0.6rem"></rect>
            </svg>
          </button>
          <div>
            <span>
              {crumbs 
                ? <>
                    {crumbs.map((crumb, i) => {
                      if(i !== 0) {
                        return(
                          <>
                            <span 
                              className='cv'
                              key={i}
                            >  </span>
                            {crumb}
                          </>
                        );
                      }
                      return(
                        <span
                          key={i}
                        >
                          {crumb}
                        </span>
                      );
                    })}
                  </>
                : <span>
                    &nbsp;
                  </span>
              }
            </span>
            <h1
              className='pageTitle'
            >
              {props.title}
            </h1>
          </div>
        </div>
        {props.rightHeader}
      </div>
      <div
        className='contentBody'
      >
        {!props.loading
          ? <>
              {props.children}
            </>
          : <Loading size='full'/>
        }
      </div>
    </div>
  )
}

Frame.Sidebar = Sidebar;
Frame.Body = Body;

export function Frame(props) {
  const [mobileSidebar, setMobileSidebar] = useState('');

  const openSidebar = () => {
    setMobileSidebar(' open');
  }

  const closeSidebar = () => {
    setMobileSidebar(' hidden');
    setTimeout(() => {
      setMobileSidebar('');
    }, 500);
  }
  
  return(
    <Context.Provider
      value={{
        mobileSidebar,
        openSidebar,
        closeSidebar
      }}
    >
      <div
        className='pageFrame'
      >
        {props.children}
      </div>
    </Context.Provider>
  )
}