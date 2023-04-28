import './card.css'
import { useNavigate } from 'react-router-dom';

export function Title(props) {
	return(
		<div
			className={`cardTitle ${props.className || ''}`.trim()}
      id={props.id}
		>
      <h3>{props.children}</h3>
		</div>
	);
}

export function Body(props) {
	return(
		<div
      className={`body ${props.className || ''}`.trim()}
      id={props.id || ''}
		>
			{props.children}
		</div>
	);
}

Card.Title = Title;
Card.Body = Body;

export function Card(props) {
  let width = '';
  let rem;
  if(!isNaN(props.width)) {
   rem = props.width;
  } else {
    width = props.width;
  }

  const navigate = useNavigate();

  const click = (event) => {
    if(props.onClick || props.link) {
      let node = event.target.nodeName;
      if(node !== 'BUTTON' && node !== 'A') {
        (props.onClick || function(){navigate(props.link)}).call();
      }
    }
  }

	return(
    <div
      className={`card ${props.width ? width + ' ' : ''}${(props.onClick || props.link) ? 'click ' : ''}${props.className ? props.className : ''}`.trim()}
      style={{width: `${rem}rem`}}
      id={props.id}
    >
      <div
        className='content'
        onClick={(event) => click(event)}
      >
        {props.children}
      </div>
    </div>
	);
}