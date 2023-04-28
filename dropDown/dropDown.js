import './dropDown.css';

const Button = (props) => {
  return(
    <div className='dropBtn'>
      {props.children}
    </div>
  )
}

const Menu = (props) => {
  return(
    <div
      style={{width: props.width}}
      className={`dropdown`}
    >
      <div className='content'>
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
      className={`dropDown ${props.className ? props.className : ''}`.trim()}
    >
      {props.children}
    </div>
  );
}