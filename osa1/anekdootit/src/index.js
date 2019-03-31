import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes} votes</div>
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = ({ anecdotes }) => {
  const randomSelection = () => Math.floor(Math.random() * anecdotes.length)
  const createVotes = new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(randomSelection)
  const [votes, setVotes] = useState(createVotes)

  const addVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostPopular = () => {
    const maxVotes = Math.max(...votes)
    const mostVoted = votes.indexOf(maxVotes)
    return [anecdotes[mostVoted], maxVotes]
  }

  return (
    <div>
      <Header text='Anecdote of the day' />
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={addVote} text='vote' />
      <Button handleClick={() => setSelected(randomSelection)} text='next anecdote' />
      <Header text='Anecdote with most votes' />
      <Anecdote anecdote={mostPopular()[0]} votes={mostPopular()[1]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));
