import './loading.css';

export const Loading = (props) => {
  return(
    <div
      id={props.id}
      className={`loading ${props.size ? props.size : 'auto'} ${props.className || ''}`.trim()}
    >
      <div>
        <span></span>
        <span
          style={{
            animationDelay: '1s'
          }}
        ></span>
        <span
          style={{
            animationDelay: '2s'
          }}
        ></span>
      </div>
    </div>
  )
}