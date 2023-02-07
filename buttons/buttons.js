import { useEffect, useState } from 'react';
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