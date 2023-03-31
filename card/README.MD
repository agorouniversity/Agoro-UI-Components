# UI Components

## Card

Usage: 

`import { Card } from './components/UI/UI';`

(Includes Card, Card.Title, Card.Body)

Card supports props:

```
width='auto'(default) or 'medium' or 'full'
className=<string>
id=<string>
onClick=<function>
link=<string> ('/<route>')
```

onClick and link will fire when anywhere in the card is clicked besides buttons or links inside the card. Don't set link and onClick as only one can fire when the card is clicked

link accepts a route and assumes you are using React-Router

Card.Title and Card.Body supports props:

```
className=<string>
id=<string>
```

Example:

```
<Card
  width='medium'
>
  <Card.Title>
    I am a card
  </Card.Title>
  <Card.Body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Card.Body>
</Card>
```