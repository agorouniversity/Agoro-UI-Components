import { useEffect, useState } from 'react';
import { Icon } from '../UI';
import './buttons.css';

/*Button skeleton for easy creation of new buttons*/
const Button = (props) => {
  const name = props.class;
  props = props.data;

  return (
    <button 
      id={props.id}
      className={`base button ${name}${props.size ? ' ' + props.size : ''}${props.className ? ' ' + props.className : ''}`}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

/*Double shadow button*/
export const ButtonA = (props) => {
  return (
    <Button
      class='buttonA'
      data={props}
    ></Button>
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

/*Icon button*/
export const IconButton = (props) => {
  const [icon, setIcon] = useState(<></>);

  useEffect(() => {
    setIcon(
      props.icon 
      ? <Icon size='auto' light={props.light} icon={props.icon} />
      : props.children
    )
  }, [props.icon, props.light, props.children])

  return(
    <button
      id={props.id}
      className={`base iconButton ${props.size ? props.size : 'medium'} ${props.className ? props.className : ''}`.trim()}
      onClick={props.onClick}
      type={props.type || 'button'}
      disabled={props.disabled}
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