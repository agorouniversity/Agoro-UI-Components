# UI Components

## Icons

Usage: 

`import { Icons } from './components/UI/UI';`

SVG Icons:

google, linkedin, github, apple, settings, filter, menu, profile, download, swap, upload, list, edit, delete

Icon components support props:

```
size='small', 'medium'(default), 'large'
light=<bool> (light or dark icon)
icon=<string>
```

Example:

```
<IconButton
 size='large'
 icon='filter'
 light={true}
/>
```