import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ButtonA, Card, Loading } from '../UI';
import './modal.css';

const Context = createContext({});

export const Body = (props) => {
  const { up, submit, loading, dismiss, error } = useContext(Context);

  return(
    <Card.Body>
      <form onSubmit={submit}>
        {props.children}
        <div className='footer'>
          {!loading
            ? <>
                {error &&
                  <div className='error'>Error: {error}</div>
                }
                {dismiss
                  ? <ButtonA
                      color='secondary'
                      onClick={up}
                    >
                      Close
                    </ButtonA>
                  : <>
                      <ButtonA type='submit'>Confirm</ButtonA>
                      <ButtonA
                        color='danger'
                        onClick={up}
                      >
                        Cancel
                      </ButtonA>
                    </>
                }
              </>
            : <Loading/>
          }
        </div>
      </form>
    </Card.Body>
  )
}

const Title = (props) => {
  return(
    <div
			className='cardTitle'
		>
      <h2>{props.children}</h2>
		</div>
  )
}

Modal.Title = Title;
Modal.Body = Body;

export function Modal (props) {
  const [slideUp, setSlideUp] = useState('');
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(props.open !== undefined ? props.open : false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setDisplay(props.open);
    setLoading(false);
    setError(undefined);
  }, [props.open])

  const up = useCallback(() => {
    setSlideUp('close');
    setTimeout(() => {
      setDisplay(false);
      setError(undefined);
      setSlideUp('');
      props.cancel();
    }, 500)
  }, [props])

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    props.confirm(event).then(
      () => {
        up();
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      }
    );
  }

  useEffect(() => {
    const esc = (event) => {
      if(event.key === 'Escape' && display) {
        up();
      }
    }

    if(display) {
      document.addEventListener("keydown", esc, false);
    } else {
      document.removeEventListener("keydown", esc, false);
    }

    return () => {
      document.removeEventListener("keydown", esc, false);
    }
  }, [display, up])

  return(
    <Context.Provider value={{up, submit, dismiss: props.closeBtn || props.error, loading, error}}> 
      {display
        ? <div
            key={display}
            id={props.id}
            className={`modal container ${slideUp}`}
          >
            <Card className={`modalCard${props.error ? ' error' : ''} ${slideUp}`}>
              {props.children}
            </Card>
          </div>
        : <></>
      }
    </Context.Provider>
  )
}