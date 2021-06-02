import React from 'react'

const Hello = (props) => {
  return (
    <div>
      <p>Hello world {props.name}!</p>
    </div>
  )
}

const App = () => {
  return (
  <>
    <h1>Bye!</h1>
    <Hello name="Bob"/>
  </>
  )
}

export default App
