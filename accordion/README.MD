# UI Components

## Acordion

Usage: 

`import { Accordion } from './components/UI/UI';` 

(includes Accordion, Accordion.Item, Accordion.Title, Accordion.Content)

Accordion supports props:

```
arrow='right' or 'left'(default) (lecation of dropdown arrow)
selected=<integer> (Makes selected Accordion item open by default)
multi=<boolean> (If multiple items can be open at once default false)
```

example:

```
<Accordion multi={true} selected={0}>
  <Accordion.Item>
    <Accordion.Title>Item 1!</Accordion.Title>
    <Accordion.Content>I am item 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Title>Item 1</Accordion.Title>
    <Accordion.Content>I am item 2</Accordion.Content>
  </Accordion.Item>
</Accordion>
```