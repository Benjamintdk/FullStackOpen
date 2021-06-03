import React, { useState } from 'react';

const Heading = ({ title }) => {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}

const Button = ({ handleclick, title }) => {
  return ( 
    <button onClick={handleclick}>
      {title}
    </button>
  )
}

const Statistic = ({ title, number }) => {
  return (
      <tbody>
        <tr> 
          <td>{title}</td>
          <td>{number}</td>
        </tr>
      </tbody>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  const sum = good+neutral+bad
  return (
    <div>
        <Statistic title="good" number={good} />
        <Statistic title="neutral" number={neutral} />
        <Statistic title="bad" number={bad} />
        <Statistic title="all" number={sum} />
        <Statistic title="average" number={(good - bad) / sum} />
        <Statistic title="positive" number={(good / sum) * 100 + "%"}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => setGood(good+1)
  const neutralClick = () => setNeutral(neutral+1)
  const badClick = () => setBad(bad+1)

  return (
    <>
      <Heading title="give feedback"/>
      <Button handleclick={goodClick} title="good"/>
      <Button handleclick={neutralClick} title="neutral"/>
      <Button handleclick={badClick} title="bad"/>
      <Heading title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App;
