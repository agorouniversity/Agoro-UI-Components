# UI Components

## Sidebar

Usage: 

`import { Sidebar } from './components/UI/UI';` 

(Includes Sidebar, Sidebar.Item, Sidebar.Subsection)

### Sidebar will only work inside a React router component

Sidebar is a navigation menu that can auto hightlight the matching button to its route

Sidebar.Subsection is a section of the sidebar that can be turned on/off and is meant to be displayed when you reach a certain route

Sidebar supports props:

```
id=<string>
className=<string>
```

Sidebar.Item supports props:

```
id=<string>
className=<string>
link=<string> (Link button to a route ex: '/courses' or '' for base route)
```

Sidebar.Subsection supports props:

```
id=<string>
className=<string>
data=<Object <{title: <string>, id: <string>}>> (If data=undefined subsection will be hidden) (id will replace :id in route prop)
route=<string> (The base route that subsection child links build upon)
```

See App.js for example