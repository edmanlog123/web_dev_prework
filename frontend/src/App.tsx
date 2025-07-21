import { useState } from 'react'
import AuthBox from './components/AuthBox'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthBox/>
    </>
  )
}

export default App
