import React, { Component, Fragment } from 'react';
import axios from 'axios';
import logo from '../images/overwatch-logo.png';
import HeroCard from './HeroCard';
import TextInput from './TextInput';

class HeroesPage extends Component {
  state = { 
    filter: '',
    heroes: [],
    isLoading: false,
    lastHeroLoaded: '',
    allHeroesLoaded: false
  }
  
  loadHeroes = (number, resetArray) => {
    this.setState({ isLoading: true });
    axios.get('/api/heroes', {
      params: {
        filter: this.state.filter,
        lastname: this.state.lastHeroLoaded,
        number
      }
    })
    .then(res => {
      this.setState((prevState) => {
        var newHeroes = res.data.reduce((heroes, hero) => {
          if (heroes.find(h => h.id === hero.id) === undefined) {
            heroes.push(hero);
          }
          return heroes;
        }, [...prevState.heroes]);

        return {heroes: resetArray ? res.data : newHeroes, isLoading: false, allHeroesLoaded: res.data.length === 0, lastHeroLoaded: res.data.length > 0 ? res.data[res.data.length-1].attributes.name : prevState.lastHeroLoaded }
      }, this.conditionalLoadHeroes);
    })
    .catch(error => {
      console.log(error);
    });
  }


  conditionalLoadHeroes = () => {
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300) &&
      !this.state.isLoading && !this.state.allHeroesLoaded
    ) {
      this.loadHeroes(3, false);
    }
  }

  handleFilterChange = text => {
    let filteredHeroes = [];
    if (text.length > this.state.filter.length) {
      filteredHeroes = this.state.heroes.filter(h => h.attributes.name.startsWith(text) || h.attributes.slug.startsWith(text));
    }
    this.setState({ filter: text, heroes: [...filteredHeroes], lastHeroLoaded: '', allHeroesLoaded: false }, () => this.loadHeroes(6, true));
  }

  componentDidMount() {
    this.loadHeroes(6, true);
    window.addEventListener('scroll', this.conditionalLoadHeroes, false);
    window.addEventListener('resize', this.conditionalLoadHeroes, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.conditionalLoadHeroes, false);
    window.removeEventListener('resize', this.conditionalLoadHeroes, false);
  }

  render() {
    const { heroes } = this.state;

    return (
      <Fragment>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <TextInput label="Search" value={this.props.filter} onTextChange={this.handleFilterChange}/>
        <div className="HeroesList">
          {heroes.map(h => <HeroCard key={h.id} hero={h} />)}
        </div>
      </Fragment>
    );
  }
}

export default HeroesPage;