import { useState, useEffect } from 'react';
import './header.css';

const HeaderButtons = (props) => {
  return(
    <header
        className='header'
      >
        <span
          className='leftCol'
        >
          <img
            alt='logo'
            className='logo'
            /*Logo goes here*/
          ></img>
          <h1>Agoro</h1>
        </span>
        <div
          className='rightCol'
        >
          {props.children}
        </div>
      </header>
  )
}

const HeaderDropDown = (props) => {
  return(
    <div
      className='headerContent'
    >
      {props.children}
    </div>
  )
}

Header.Buttons = HeaderButtons;
Header.DropDown = HeaderDropDown;

export function Header(props) {
  const [close, setClose] = useState(' ');

  useEffect(() => {
    if(!props.dropDownOpen && close === '') {
      setTimeout(() => {
        setClose('close ');
      }, 550)
    }
  }, [props.dropDownOpen, close])

  useEffect(() => {
    setClose('')
  }, [])

  return(
    <div
      id={props.id}
      className={`${props.dropDownOpen ? 'open ' : ''}headerBg ${props.className ? props.className : ''}`.trim()}
    >
     
        <div
          className={`${props.dropDownOpen ? 'open ' : ''}headerContainer`}
        >
          {props.children}
        </div>
    </div>
  )
}