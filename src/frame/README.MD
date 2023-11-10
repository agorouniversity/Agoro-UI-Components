# UI Components

## Frame

Usage: 

`import { Frame } from './components/UI/UI';` 

(Includes Frame, Frame.Header, Frame.Sidebar, Frame.Body)

### Frame will only work inside a React data router component

Frame is a wrapper for each page that keeps the layout consistent

Frame.Header is a wrapper for a persistent top full width header

Frame.Sidebar is a wrapper for a left justified sidebar

Frame.Body is for main page content

Only Frame.Body supports props:

```
title=<string> (Title of current page)
rightHeader=<Component> (Element that displays on the right opposite the page title)
restrict=<boolean> (If true display permission denied instead of page)
```

See App.js for example