# UI Components

## Acordion

Usage: 

`import { Accordion } from './components/UI/UI';` 

(Includes Accordion, Accordion.Item, Accordion.Title, Accordion.Content, Accordion.Col)

Accordion supports props:

```
arrow='right' or 'left'(default) (lecation of dropdown arrow, always right in table mode)
selected=<integer> (Makes selected Accordion item open by default)
multi=<boolean> (If multiple items can be open at once default false)
table=<boolean> (If accordion acts like a table)
```

Standard example:

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

Table example:
```
<Accordion table>
  <Accordion.Heading>
    <Accordion.Col>Section1</Accordion.Col>
    <Accordion.Col>Section2</Accordion.Col>
  </Accordion.Heading>
  <Accordion.Item>
    <Accordion.Title>
      <Accordion.Col>Cell 1</Accordion.Col>
      <Accordion.Col>Cell 2</Accordion.Col>
    </Accordion.Title>
    <Accordion.Content>
      Content here!
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item>
    <Accordion.Title>
      <Accordion.Col>Cell 3</Accordion.Col>
      <Accordion.Col>Cell 4</Accordion.Col>
    </Accordion.Title>
    <Accordion.Content>
      Row 2 content
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```
