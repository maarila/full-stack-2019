import React, { useState } from 'react';

const Header = ({ text }) => <h1>{text}</h1>;

const Subheader = ({ text }) => <h2>{text}</h2>;

const Persons = ({ persons }) => {
  return persons.map(person => <Person key={person.name} person={person} />);
};

const Person = ({ person }) => (
  <div>
    {person.name} {person.number}
  </div>
);

const Filter = ({ text, value, handleChange }) => {
  return (
    <div>
      {text} <input value={value} onChange={handleChange} />
    </div>
  );
};

const PersonForm = ({
  name,
  number,
  submit,
  nameValue,
  nameChange,
  numberValue,
  numberChange
}) => {
  return (
    <form onSubmit={submit}>
      <div>
        {name} <input value={nameValue} onChange={nameChange} />
      </div>
      <div>
        {number} <input value={numberValue} onChange={numberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '045-1234567' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addName = event => {
    event.preventDefault();
    const personExists = persons.filter(person => person.name === newName);

    if (personExists.length) {
      alert(`${newName} on jo luettelossa`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
    }
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = event => {
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <Header text="Puhelinluettelo" />
      <Filter
        text="rajaa näytettäviä: "
        value={newFilter}
        handleChange={handleFilterChange}
      />
      <Subheader text="Lisää uusi" />
      <PersonForm
        name="nimi: "
        number="numero: "
        submit={addName}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />
      <Subheader text="Numerot" />
      <div>
        {newFilter.length === 0 ? (
          <Persons persons={persons} />
        ) : (
          <Persons
            persons={persons.filter(person =>
              person.name.toLowerCase().includes(newFilter.toLowerCase())
            )}
          />
        )}
      </div>
    </div>
  );
};

export default App;
