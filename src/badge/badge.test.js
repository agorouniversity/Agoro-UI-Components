import { render, screen } from '@testing-library/react';
import { Badge } from './badge';

test('Badge displays', () => {
  render(
    <Badge number={50}></Badge>
  )

  expect(screen.getByText('50')).toBeInTheDocument();
})

test('Badge with content displays', () => {
  render(
    <Badge number={7}>
      <button>button</button>
    </Badge>
  )

  expect(screen.getByText('7')).toBeInTheDocument();
  expect(screen.getByText('button')).toBeInTheDocument();
})

test('Badge only displays', () => {
  render(
    <Badge.Only number={18}/>
  )

  expect(screen.getByText('18')).toBeInTheDocument();
})