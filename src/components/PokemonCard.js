import React from 'react';
import { Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { useNavigate } from "react-router-dom";

function PokemonCard({ pokemon }) {
  let navigate = useNavigate();

  const convertUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const getTotalOwned = () => {
    const myPokemon = JSON.parse(localStorage.getItem("pokemon_data"));
    const selectPokemon = myPokemon.filter(
      (value) => value.id === pokemon.id
    );
    return selectPokemon.length;
  };

  return (
    <Col
      md="3" sm="6"
      onClick={() => navigate(`/detail/${pokemon.name}`)}
    >
      <Card className="my-2 pokemon-card">
        <CardBody className="d-flex flex-column">
          <div className="image-pokemon">
            <img src={pokemon.image} alt={pokemon.name}/>
          </div>
          <CardTitle className="mt-3">
            <h5>{convertUpperCase(pokemon.name)}</h5>
          </CardTitle>
          <CardText>
            Owned: {getTotalOwned()}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  )
}


export default PokemonCard;