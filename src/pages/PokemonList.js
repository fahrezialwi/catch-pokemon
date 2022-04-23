import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import PokemonCard from '../components/PokemonCard'

const GET_QUERY = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }
`;

function PokemonList() {
  let navigate = useNavigate();

  const [pokemons, setPokemons] = useState([]);

  const pageSize = 12;

  const { loading, error, data } = useQuery(GET_QUERY, {
    variables: {
      limit: pageSize,
      offset: 0,
    }
  });

  useEffect(() => {
    if (loading) {
      // console.log(loading)
    } else if (error) {
      console.error(error);
    } else {
      setPokemons(data.pokemons.results);
    }
  }, [loading, error, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const renderPokemons = () => {
    return pokemons.map((pokemon) => {
      return (
        <PokemonCard
          pokemon={pokemon}
          key={pokemon.id}
        />
      );
    });
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <img
              src={require("../images/pokemon-logo.png")}
              alt="Pokemon Logo"
              width="400px"
              className="mt-4 img-fluid"
            />
            <h2>
              Pokemon Catch App
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => navigate('/my-pokemon/')} className="my-4" color="success" >My Pokemon</Button>
          </Col>
        </Row>
        <Row>
          {renderPokemons()}
        </Row>
      </Container>
    </div>
  );
}

export default PokemonList;
