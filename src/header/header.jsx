import React, { useState, useEffect } from 'react';
import Logo from '../images/logo.png';
import LogoDark from '../images/logoDark.png';
import './header.css';
import { Link } from 'react-router-dom';

const HeaderButtons = (props) => {
  return(
    <header
        className='header'
      >
        <Link
          to='/'
          className='leftCol'
        >
          <div
            className='logo img'
            style={{backgroundImage: `url(${props.dark ? LogoDark : Logo})`}}
          ></div>
          <h1>Agoro</h1>
        </Link>
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