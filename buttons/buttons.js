import { useEffect, useState } from 'react';
import { Icon } from '../UI';
import './buttons.css';
import { Link } from 'react-router-dom';

/*Button skeleton for easy creation of new buttons*/
const Button = (data) => {
  const [props, setProps] = useState(data.data);
  const name = data.class;

  useEffect(() => {
    setProps(data.data);
  }, [data])

  return (
    <>
      {props.link
        ? <Link
            to={props.link}
            id={props.id}
            className={`base button${props.color ? ' ' + props.color : ''} ${name}${props.size ? ' ' + props.size : ''}${props.className ? ' ' + props.className : ''}`}
            onClick={props.onClick}
            disabled={props.disabled}
            onMouseDown={data.onMouseDown}
            onMouseUp={data.onMouseUp}
          >
            <span>{props.children}</span>
          </Link>
        : <button 
            id={props.id}
            className={`base button${props.color ? ' ' + props.color : ''} ${name}${props.size ? ' ' + props.size : ''}${props.className ? ' ' + props.className : ''}`}
            onClick={props.onClick}
            type={props.type || 'button'}
            disabled={props.disabled}
            onMouseDown={data.onMouseDown}
            onMouseUp={data.onMouseUp}
            form={props.form}
          >
            <span>{props.children}</span>
          </button>
      }
    </>
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

export const ButtonC = (props) => {
  const [state, setState] = useState('')

  useEffect(() => {
    
  }, [])

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