import React from 'react'

const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ name, exercise }) => {
    return (
      <div>
        <p>
          {name} {exercise}
        </p>
      </div>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(part =>
           <Part key={part.id} name={part.name} exercise={part.exercises} />
        )}
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    return (
      <div>
        total of {parts.reduce((a,b) =>
        a+b.exercises, 0)}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    const { name, parts } = course
    return (
      <div>
        <Header name={name} />
        <Content parts={parts} />
        <br />
        <Total parts={parts} />
      </div>
    )
  }

  export default Course