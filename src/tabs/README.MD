# UI Components

## Tabs

Usage: 

`import { Tabs } from './components/UI/UI';` 

(Includes Tabs, Tabs.TitleBar, Tabs.Title, Tabs.Body, Tabs.Tab)

Tabs supports props:

```
id=<string>
className=<string>
selected=<integer> (Which tab is selected by default)
```

Example:

```
<Tabs>
  <Tabs.TitleBar>
    <Tabs.Title>One</Tabs.Title>
    <Tabs.Title>Two</Tabs.Title>
  </Tabs.TitleBar>
  <Tabs.Body>
    <Tabs.Tab>
      I Correspond to the first tab title
    </Tabs.Tab>
    <Tabs.Tab>
      I Correspond to the second tab title
    </Tabs.Tab>
  </Tabs.Body>
</Tabs>
```