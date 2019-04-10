import React, { useState, useEffect } from 'react';
import personService from './services/persons';

const Header = ({ text }) => <h1>{text}</h1>;

const Subheader = ({ text }) => <h2>{text}</h2>;

const Persons = ({ persons, handleClick }) => {
  return persons.map(person => (
    <Person key={person.name} person={person} handleClick={handleClick} />
  ));
};

const Person = ({ person, handleClick }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => handleClick(person.id)}>poista</button>
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
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response);
    });
  }, []);

  const addName = event => {
    event.preventDefault();
    const personExists = persons.find(person => person.name === newName);

    if (personExists && personExists.number !== newNumber) {
      const replaceNumber = window.confirm(
        `${newName} on jo luettelossa, korvataanko vanha numero uudella`
      );
      if (replaceNumber) {
        const updatedPerson = {
          id: personExists.id,
          name: personExists.name,
          number: newNumber
        };
        personService.update(updatedPerson).then(response => {
          setPersons(
            persons.filter(person => person.id !== response.id).concat(response)
          );
        });
      }
    } else if (personExists) {
      alert(`${personExists.name} on jo luettelossa`);
      return;
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      personService.create(newPerson).then(response => {
        setPersons(persons.concat(response));
        setNewName('');
        setNewNumber('');
      });
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

  const removePerson = id => {
    const personToRemove = persons.find(person => person.id === id);
    const result = window.confirm(`Poistetaanko ${personToRemove.name}?`);
    if (result) {
      personService.remove(id).then(response => {
        setPersons(persons.filter(person => person.id !== id));
      });
    }
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
          <Persons persons={persons} handleClick={removePerson} />
        ) : (
          <Persons
            persons={persons.filter(person =>
              person.name.toLowerCase().includes(newFilter.toLowerCase())
            )}
            handleClick={removePerson}
          />
        )}
      </div>
    </div>
  );
};

export default App;
