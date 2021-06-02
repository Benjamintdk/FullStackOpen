import React from 'react'

const Header = (course) => {
  return (
    <div>
      <h1>course</h1>
    </div>
  )
}

const Part = (course) => {
  return (
    <div>
      <p>
        {course.part} {course.exercise}
      </p>
    </div>
  )
}

const Content = (courses) => {
  return (
    <div>
      <Part part={courses.part1} exercise={courses.exercises1} />
      <Part part={courses.part2} exercise={courses.exercises2} />
      <Part part={courses.part3} exercise={courses.exercises3} />
    </div>
  )
}

const Total = (exercises) => {
  return (
    <div>
      <p>Number of exercises {exercises.exercises1 + exercises.exercises2 + exercises.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </>
  )
}

export default App;
