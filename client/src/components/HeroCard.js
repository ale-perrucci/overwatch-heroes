import React from 'react';
import { Link } from 'react-router-dom';

const HeroCard = (props) => {
  const { hero } = props;
  const bgImage = hero.attributes.image_card_background;
  const portrait = hero.attributes.image_portrait;

  return (
    <div className="HeroCard" style={{backgroundImage:`url(${bgImage})`}}>
      <div className="HeroCard__header">
        <Link to={`/heroes/${hero.attributes.slug}`}><img className="HeroCard__portrait" src={portrait} alt={`${hero.attributes.name} portrait`} /></Link>
        <h1 className="HeroCard__name" ><Link to={`/heroes/${hero.attributes.slug}`}>{hero.attributes.name}</Link></h1>
      </div>
      <div className="HeroCard__button-container">
        <Link className="Button" to={`/heroes/${hero.attributes.slug}`}>Relationships</Link>
        <Link className="Button" to={`/heroes/${hero.attributes.slug}`}>Tips</Link>
        <Link className="Button" to={`/heroes/${hero.attributes.slug}`}>Stats</Link>
        <Link className="Button" to={`/heroes/${hero.attributes.slug}`}>Role</Link>
      </div>
    </div>
  );
};

export default HeroCard;