import React from 'react'

const Header = (course) => {
  return (
    <div>
      <h1>{course.course.name}</h1>
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
      <Part part={courses.course.parts[0].name} exercise={courses.course.parts[0].exercises} />
      <Part part={courses.course.parts[1].name} exercise={courses.course.parts[1].exercises} />
      <Part part={courses.course.parts[2].name} exercise={courses.course.parts[2].exercises} />
    </div>
  )
}

const Total = (exercises) => {
  return (
    <div>
      <p>Number of exercises {exercises.course.parts[0].exercises + exercises.course.parts[1].exercises + exercises.course.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App;
