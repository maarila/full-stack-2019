import React from 'react';
import ReactDOM from 'react-dom';

const Hello = () => {
  return (
    <div>
      <p>Hello World</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Hello />
      <Hello />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
