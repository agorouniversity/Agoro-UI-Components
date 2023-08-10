import { useEffect, useState } from 'react';
import { Card } from '../UI';
import './grade.css';

export const Grade = (props) => {
  const [color, setColor] = useState(['', '']);
  const [score, setScore] = useState(null);

  useEffect(() => {
    if(props.total != null && props.points != null) {
      let tmpScore = (props.points / props.total) * 100;
      setScore(tmpScore);
      if(tmpScore < 50) {
        setColor(['danger', 'lightDanger']);
      } else if(tmpScore < 70) {
        setColor(['warn', 'lightWarn']);
      } else {
        setColor(['green', 'lightPrimary']);
      }
    }
  }, [props.total, props.points])

  return(
    <>
      {score !== null &&
        <Card
          onClick={props.onClick}
          link={props.link}
          id={props.id}
          className={`gradeWrapper ${props.className || ''}`}
        >
          <Card.Title className={color[0]}>{props.points} / {props.total} points</Card.Title>
          <div
            className='grade'
          >
            <div
              className='overlay'
              style={{
                background: `linear-gradient(90deg, var(--${color[0]}) ${score}%, var(--${color[1]}) ${score}%)`
              }}
            >
              <h1>{score.toFixed(2)}%</h1>
            </div>
            {props.children}
          </div>
        </Card>
      }
    </>
  )
}