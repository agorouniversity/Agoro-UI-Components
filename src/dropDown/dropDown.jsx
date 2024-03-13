import './dropDown.css';
import React from 'react';

const Button = (props) => {
  return(
    <div
      className='dropBtn'
      aria-haspopup={true}
      aria-expanded={false}
      tabIndex={0}
    >
      {props.children}
    </div>
  )
}

const Menu = (props) => {
  return(
    <div
      style={{width: props.width}}
      className={`dropdown`}
      tabIndex={-1}
      aria-hidden={true}
    >
      <div className={`content ${props.dark ? 'dark' : 'light'}`}>
        {props.children}
      </div>
    </div>
  )
} 

DropDown.Button = Button;
DropDown.Menu = Menu;

export function DropDown(props) {

  return(
    <div
      id={props.id}
      className={`dropDown${props.className ? ' ' + props.className : ''} ${props.dark ? 'dark' : 'light'}`.trim()}
    >
      {props.children}
    </div>
  );
}