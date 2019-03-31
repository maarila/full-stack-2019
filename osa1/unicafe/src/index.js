import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({ good, neutral, bad, total }) => {
  return (
    <table>
      <tbody>
        <Statistic text='hyvä' stat={good} />
        <Statistic text='neutraali' stat={neutral} />
        <Statistic text='huono' stat={bad} />
        <Statistic text='yhteensä' stat={total} />
        <Statistic text='keskiarvo' stat={(good - bad) / total} />
        <Statistic text='positiivisia' stat={(good / total) * 100 + ' %'} />
      </tbody>
    </table>
  )
}
const Header = ({ title }) => <h1>{title}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, stat }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad

  return (
    <div>
      <Header title={'anna palautetta'} />
      <Button handleClick={() => setGood(good + 1)} text={'hyvä'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutraali'} />
      <Button handleClick={() => setBad(bad + 1)} text={'huono'} />
      <Header title={'statistiikka'} />
      {total ? <Statistics good={good} neutral={neutral} bad={bad} total={total} />
          : <div>Ei yhtään palautetta annettu</div> }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
