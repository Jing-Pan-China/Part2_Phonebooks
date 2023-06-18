import { useState,useEffect } from 'react';
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');

  const hook=()=>{
    axios
      .get("http://localhost:3002/persons")
      .then(response=>{
        setPersons(response.data)
        
      })
      }

    useEffect(hook, [])
   

  const handleSubmit = (event) => {
    event.preventDefault();

    const isDuplicate = persons.some((person) => person.name === newName);

    if (isDuplicate) {
      alert(`${newName} already exists in the phonebook!`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons([...persons, newPerson]);
    setNewName('');
    setNewNumber('');
  };

  const handleChangeName = (event) => {
    const name = event.target.value;

    const isDuplicate = persons.some((person) => person.name === name);

    if (isDuplicate) {
      alert(`${name} already exists in the phonebook!`);
      return;
    }

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
      <form onSubmit={handleSubmit}>
        <h1>add a new</h1>
        <div>
          name: <input type="text" value={newName} onChange={handleChangeName} />
        </div>
        <div>
          number: <input type="text" value={newNumber} onChange={handleChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, index) => (
          <li key={index}>
            {person.name} {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
        };

export default App;

