import React from "react";
import { Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";

function MyPokemonCard({ pokemon, releasePokemon }) {

  const convertUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <Col
      md="3" sm="6"
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
            Nickname: {pokemon.nickname}
          </CardText>
          <Button
              color="danger"
              className="mt-auto"
              onClick={() => releasePokemon(pokemon.nickname)}
            >
              Release
            </Button>
        </CardBody>
      </Card>
    </Col>
  )
}

export default MyPokemonCard;