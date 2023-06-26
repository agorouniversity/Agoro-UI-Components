import './badge.css';

const Only = (props) => {
  return(
    <div
      className={`badge ${props.className || ''}`.trim()}
      id={props.id}
      style={{backgroundColor: props.color ? `var(--${props.color})` : 'var(--danger)'}}
    >
      {props.number}
    </div>
  )
}


Badge.Only = Only

export function Badge (props) {
  return(
    <div
      className={`badgeWrapper ${props.className || ''}`.trim()}
      id={props.id}
    >
      {props.children}
      <Only color={props.color} number={props.number} />
    </div>
  )
}