import React from 'react'

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = ({ parts }) => {
  return (
    <p>yhteensä {parts.map(part => part.exercises).reduce((a, b) => a + b)} tehtävää</p>
  )
}

export default Course
