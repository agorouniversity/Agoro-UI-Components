import React, { useState, useEffect } from 'react';
import Logo from '../images/logo.png';
import LogoDark from '../images/logoDark.png';
import './header.css';
import { Link } from 'react-router-dom';
import { Button, DropDown } from '../UI';
import {Theme} from "../theme/Theme";

const HeaderButtons = (props) => {
  return(
    <header
        className='header'
        style={{backgroundColor: props.color}}
      >
        <Link
          to='/'
          className='leftCol'
        >
          <div
            className={`logo img${props.size ? ' ' + props.size : ''}`}
            style={{backgroundImage: `url(${props.dark ? LogoDark : Logo})`}}
          ></div>
          <h1 className={`h1${props.size ? ' ' + props.size : ''} ${props.dark ? 'dark' : 'light'}`}>Agoro</h1>
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
      <DropDown>
        <DropDown.Button>
          <Button size="small">Options</Button>
        </DropDown.Button>
        <DropDown.Menu dark={false}>
          <span>Theme</span>
          {props.children}
        </DropDown.Menu>
      </DropDown>
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
    <Theme>
      <div
        id={props.id}
        className={`${props.dropDownOpen ? 'open' : ''} headerBg${props.className ? ' ' + props.className : ''}`}
      >
        <div
          className={`${props.dropDownOpen ? 'open' : ''} headerContainer${props.className ? ' ' + props.className : ''}`}
        >
          {props.children}
        </div>
      </div>
    </Theme>
  )
}