import './dropDown.css';

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