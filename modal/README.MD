# UI Components

## Select

Usage: 

`import { Modal } from './components/UI/UI';`

(Includes Modal, Modal.Title, Modal.Body)

Modal is a popup dialog that covers the whole screen, modal body is a form

Modal can be dismissed also by pressing the esc key

Modal supports props:

```
id=<string>
className=<string>
open=<boolean> (Whether modal is open)
cancel=<function> (Function to call when cancel button is pressed)
confirm=<function> (Function to call when confirm button is pressed, will return event from form, will hide modal if recieved true promise, loading otherwise)
closeBtn=<boolean> (Whether to display single close button as opposed to Confirm and Cancel buttons)
```

Example:

```
const [modal, setModal] = useState(false);

<Modal
  open={modal}
  confirm={(event) => console.log(event)}
  cancel={() => setModal(false)}
>
  <Modal.Title>I am a modal</Modal.Title>
  <Modal.Body>Put form items here</Modal.Body>
</Modal>
```