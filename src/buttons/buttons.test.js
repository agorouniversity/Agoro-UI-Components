import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ButtonA, ButtonB, IconButton } from './buttons';

test('Badge displays', () => {
  render(
    <ButtonA number={50}></ButtonA>
  )

  expect(screen.getByText('50')).toBeInTheDocument();
})

// test('Badge with content displays', () => {
//   render(
//     <Badge number={7}>
//       <button>button</button>
//     </Badge>
//   )

//   expect(screen.getByText('7')).toBeInTheDocument();
//   expect(screen.getByText('button')).toBeInTheDocument();
// })

// test('Badge only displays', () => {
//   render(
//     <Badge.Only number={18}/>
//   )

//   expect(screen.getByText('18')).toBeInTheDocument();
// })