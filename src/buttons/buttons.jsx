import React, { useEffect, useState } from 'react';
import { Icon } from '../UI';
import {Theme} from "../theme/Theme";
import './buttons.css';
import { Link } from 'react-router-dom';

/*Button skeleton for easy creation of new buttons*/
const Button = (props) => {
  const [state, setState] = useState(props.data);

  useEffect(() => {
    setState(props.data);
  }, [props.data]);

  const { link, id, color, size, className, onClick, disabled, onMouseDown, onMouseUp, type, title, form, children } = state;

  return (
      <>
        {link ? (
            <Link
                to={link}
                id={id}
                className={`base button${color ? ' ' + color : ''} ${name}${size ? ' ' + size : ''}${className ? ' ' + className : ''}`}
                onClick={onClick}
                disabled={disabled}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
              <span>{children}</span>
            </Link>
        ) : (
            <button
                id={id}
                className={`base button${color ? ' ' + color : ''} ${name}${size ? ' ' + size : ''}${className ? ' ' + className : ''}`}
                onClick={onClick}
                type={type || 'button'}
                disabled={disabled}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                title={title}
                form={form}
            >
              <span>{children}</span>
            </button>
        )}
      </>
  );
};

/*Double shadow button*/
export const ButtonA = (props) => {
  return (
    <Theme>
      <Button
        class='buttonA'
        data={props}
      ></Button>
    </Theme>
  );
}


/*Circle animation button*/
export const ButtonB = (props) => {
  const [hideAni, setHideAni] = useState('hideAni');

  useEffect(() => {
    setTimeout(() => {
      setHideAni('')
    }, 500)
  }, [])

  return (
    <Button
      class={`buttonB ${hideAni}`.trim()}
      data={props}
    ></Button>
  );
}

export const ButtonC = (props) => {
  const [state, setState] = useState('');

  return (
    <Button
      class={`buttonC ${state}`.trim()}
      data={props}
      onMouseDown={() => setState('active')}
      onMouseUp={() => setState('pressed')}
    ></Button>
  );
}

/*Icon button*/
export const IconButton = (props) => {
  const [icon, setIcon] = useState(<></>);

  useEffect(() => {
    setIcon(
      props.icon 
      ? <Icon size='auto' light={props.light} icon={props.icon} />
      : props.children
    )
  }, [props.icon, props.children, props.light])

  return(
    <button
      id={props.id}
      className={`base iconButton ${props.size ? props.size : 'medium'} ${props.className ? props.className : ''}`.trim()}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={props.disabled}
      title={props.title}
    >
      <div
        className='iconBg'
      >
        {icon}
      </div>
      <div
        className='buttonIcon'
      >
        {icon}
      </div>
    </button>
  )
}
