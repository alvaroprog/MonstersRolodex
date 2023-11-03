import './App.css';
import { Component } from 'react';
import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((monstersList) => this.setState(() => {
        return {monsters: monstersList}
      }));
  }

  onChangeHandler = (event) => {
    const searchField = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return {searchField};
    })
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onChangeHandler } = this;
    const filteredMonsters = monsters.filter((monster) => monster.name.toLocaleLowerCase().includes(searchField));

    return (
      <div className='App'>
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox className='search-box' placeholder='Find a monster' onChangeHandler={onChangeHandler} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}

export default App;