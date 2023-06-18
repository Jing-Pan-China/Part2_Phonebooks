import { useState, useEffect, useMemo } from 'react';
import PersonsService from './personsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const personsService = useMemo(() => new PersonsService(), [])

  useEffect(() => {
    personsService
      .getPersonsAsync()
      .then((persons) => setPersons(persons))
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault();

    // UPDATING
    const oldPerson = persons.find((person) => person.name === newName);
    if (!!oldPerson) {
      const updatedPerson = {
        ...oldPerson,
        number: newNumber
      }
      await personsService.updatePersonAsync(updatedPerson)
      const updatedPersons = persons.map((person) => {
        if (person.name === newName) {
          return {
            ...person,
            number: newNumber
          }
        }
        return person
      })
      setPersons(updatedPersons)
      return
    }
  
    // CREATING
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    await personsService.createPersonAsync(newPerson)

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = async (personId) => {
    await personsService.deletePersonByIdAsync(personId)
    const newPersons = persons.filter((person) => person.id !== personId)
    setPersons(newPersons);
  }

  const handleChangeName = (event) => {
    const name = event.target.value;

    setNewName(name);
  };

  const handleChangeNumber = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  return (
    <div>

      <div>
        <h1>Phonebook</h1>
        filter shown with: <input type="text" value={searchName} onChange={handleSearchChange} />
      </div>
      <form onSubmit={handleCreate}>
        <h1>add a new</h1>
        <div>
          name: <input type="text" value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input type="text" value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit" onSubmit={handleCreate}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number} <button type="submit" onClick={async () => await handleDelete(person.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

