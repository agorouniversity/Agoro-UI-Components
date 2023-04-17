import { useEffect, useState } from 'react';
import { Card } from '../UI';
import './grade.css';

export const Grade = (props) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    if(props.grade < 50) {
      setColor('--lightDanger');
    } else if(props.grade < 70) {
      setColor('--lightWarn');
    } else {
      setColor('--lightPrimary');
    }
  }, [props.grade])

  return(
    <Card
      onClick={props.onClick}
      link={props.link}
      id={props.id}
      className={props.className || ''}
    >
      <div
        className='grade'
        style={{
          background: `linear-gradient(90deg, var(${color}) ${props.grade}%, transparent ${props.grade}%)`
        }}
      >
        {props.children}
      </div>
    </Card>
  )
}