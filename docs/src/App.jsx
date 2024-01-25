import { useState } from 'react'
import { ButtonA, Box } from "@agoro-ui/agoro-ui-components";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Box />
      <div>
          <ButtonA color='Primary' type='submit'>Test</ButtonA>
      </div>
    </>
  )
}

export default App
