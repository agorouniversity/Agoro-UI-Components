import { createContext, useContext, useEffect, useState } from 'react';
import { useMatches, Link } from 'react-router-dom';
import { Context } from '../context';
import { Loading } from '../UI';
import './frame.css';

const ChildContext = createContext({});

const Sidebar = (props) => {
  const { mobileSidebar, closeSidebar, full } = useContext(ChildContext);

  return(
    <>
      {!full &&
        <div
          onClick={() => closeSidebar()}
          className={`frameSidebar${mobileSidebar}`}
        >
          {props.children}
        </div>
      }
    </>
  )
}

const Body = (props) => {
  const [crumbs, setCrumbs] = useState(undefined);
  const [permDenied, setPermDenied] = useState(undefined);
  const matches = useMatches();
  const { openSidebar, course, viewingObject, full } = useContext(ChildContext);

  useEffect(() => {
    setCrumbs(matches
      .filter((match) => Boolean(match.handle?.crumb))
      .map((match) => match.handle.crumb(match.data)));
  }, [matches])

  useEffect(() => {
    if(props.restrict !== undefined) {
      setPermDenied(props.restrict);
    } else {
      setPermDenied(false);
    }
  }, [props.restrict])

  return(
    <div
      className={`frameBody ${props.className || ''}`.trim()}
    >
      {!full &&
        <div
          className='pageHeading'
        >
          <div
            className='titleBar'
          >
            <button
              type='button'
              onClick={() => openSidebar()}
              title='menu'
            >
              <svg viewBox="0 0 100 80" width="2rem" height="3rem">
                <rect width="100" height="0.6rem"></rect>
                <rect y="30" width="100" height="0.6rem"></rect>
                <rect y="60" width="100" height="0.6rem"></rect>
              </svg>
            </button>
            <div>
              <span className='crumbs'>
                {crumbs
                  ? <>
                      {crumbs.map((crumb, i) => {
                        if(i !== 0) {
                          return(
                            <span key={i}>
                              <span
                                className='cv'
                              >  </span>
                              {crumb.edit
                                ? <Link
                                    to={crumb.link}
                                  >
                                    {crumb.title
                                      .replace(':id', (course?.courseName || (props.error && 'Error')))
                                      .replace(':assignmentId', viewingObject || (props.error && 'Error'))
                                      .replace(':studentId', viewingObject || (props.error && 'Error'))}
                                  </Link>
                                : <Link
                                    to={crumb.link}
                                  >
                                    {crumb.title}
                                  </Link>
                              }
                            </span>
                          );
                        }
                        return(
                          <span
                            key={i}
                          >
                            <Link to={crumb.link}>{crumb.title}</Link>
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
                {(permDenied === false && props.title)
                  ? props.title
                  : (!props.error && <>&nbsp;</>)
                }
              </h1>
            </div>
          </div>
          {(!full && !props.loading) &&
            props.rightHeader
          }
        </div>
      }
      <div
        className='contentBody'
      >
        {!props.error
          ? <>
              {((permDenied === true || !props.loading) && !(props.restrict && permDenied === undefined))
                ? <>
                    {permDenied !== true
                      ? props.children
                      : <div className='pageError'>
                          <span className='title'>
                            Permission Denied
                          </span>
                          <Link to='/'>Return Home</Link>
                        </div>
                    }
                  </>
                : <Loading size='full'/>
              }
            </>
          : <div className='pageError'>
              <div className='title'>
                {props.error}
              </div>
              <Link to='/'>Return Home</Link>
            </div>
        }
      </div>
    </div>
  )
}

Frame.Sidebar = Sidebar;
Frame.Body = Body;

export function Frame(props) {
  const [mobileSidebar, setMobileSidebar] = useState('');
  const { course, viewingObject } = useContext(Context);

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
    <ChildContext.Provider
      value={{
        course,
        viewingObject,
        mobileSidebar,
        openSidebar,
        closeSidebar,
        full: props.full
      }}
    >
      <div
        className={`pageFrame${props.full ? ' full' : ''}`}
      >
        {props.children}
      </div>
    </ChildContext.Provider>
  )
}