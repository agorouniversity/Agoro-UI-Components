# UI Components

## Login

Usage: 

`import { Login } from './components/UI/UI';`

Login is a that lets the user login with email/password and has links to sign in with Google, Linkedin, Github, and Apple. Integrates with the header dropdown component.

Login support props:

```
show=<boolean> (Show or hide login component)
hide=<function> (Calls upon successful login - used to hide header dropdown)
login=<function> (Calls function(email, password, setUser) when user attempts to login. Expects a promise response = resolve will call hide() and reject will display error message)
errorMessage=<string> (Display error message on login screen)
```

Example:

```
<Login
  show={drop}
  login={login}
  hide={() => setDrop(false)}
/>
```