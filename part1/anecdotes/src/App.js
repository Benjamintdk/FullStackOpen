import React, { useState } from 'react';

const Button = ({text, handleClick}) => {
  return (
      <button onClick={handleClick}>
        {text}
      </button>
  )
} 

const Heading = ({ text }) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Display = ({ text }) => {
  return (
    <div>
      <p>
        {text}
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [maxVotesIndex, setMaxVotesIndex] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const randomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const updateVotes = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    if (copy[selected]> votes[maxVotesIndex]) setMaxVotesIndex(selected)
    setVotes(copy)
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Display text={anecdotes[selected]} />
      <Display text = {"has " + votes[selected] + " votes"} />
      <Button text="vote" handleClick={updateVotes}/>
      <Button text="next anecdote" handleClick={randomAnecdote} />
      <Heading text="Anecdote with most votes" />
      <Display text={anecdotes[maxVotesIndex]} />
      <Display has text={"has " + votes[maxVotesIndex] + " votes"} />
    </div>
  )
}

export default App;
