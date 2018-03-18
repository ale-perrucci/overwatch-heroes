import React, { Component } from 'react';
import axios from 'axios';

class HeroPage extends Component {
  state = { hero: null };

  componentDidMount() {
    axios.get(`/api/heroes/${this.props.match.params.name}`)
    .then(res => {
      this.setState({ hero: res.data });
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { hero } = this.state;
    
    if (!hero) {
      return null;
    }

    const splash = hero.attributes.image_splash;
    const portrait = hero.attributes.image_portrait;

    return (
      <div className="HeroPage" style={{ backgroundImage: `url(${splash})` }}>
        <div className="HeroPage__container">
          <div className="HeroCard__header">
            <img className="HeroCard__portrait" src={portrait} alt={`${hero.attributes.name} portrait`} />
            <h1 className="HeroCard__name" >{hero.attributes.name}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default HeroPage;