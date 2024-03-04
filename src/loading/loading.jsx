import './loading.css';

export const Loading = (props) => {
  return(
    <div
      role='progressbar'
      name='loading'
      id={props.id}
      className={`loading ${props.size ? props.size : 'auto'} ${props.className || ''}${props.fadeIn ? 'fadeIn' : ''}`.trim()}
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