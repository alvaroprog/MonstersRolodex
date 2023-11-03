import { useState, useEffect } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

const App = () => {

  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);
  const [searchField, setSearchField] = useState('');

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((monstersList) => setMonsters(monstersList));
  }, []);

  useEffect(() => {
    const filteredMonstersList = monsters.filter((monster) => monster.name.toLocaleLowerCase().includes(searchField));
    setFilteredMonsters(filteredMonstersList);
  }, [monsters, searchField]);

  const onChangeHandler = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    setSearchField(searchField);
  }

  return (
    <div className='App'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='search-box' placeholder='Find a monster' onChangeHandler={onChangeHandler} />
      <CardList monsters={filteredMonsters} />
    </div>
  )
}

export default App;