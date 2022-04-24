import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import InfiniteScroll from "react-infinite-scroller"
import PokemonCard from "../components/PokemonCard"

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
  const [page, setPage] = useState(1);
  const [pokemons, setPokemons] = useState([]);
  const pageSize = 12;

  const { loading, error, data } = useQuery(GET_QUERY, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    }
  });

  useEffect(() => {
    if (!loading) {
      setPokemons(pokemons => pokemons.concat(data.pokemons.results));
    }
    if (error) {
      console.error(error);
    }
  }, [loading, error, data]);
  
  const loader = (
    <div className="text-center mb-5" key="loader">
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      />
    </div>
  );

  const loadMore = () => {
    if (!loading) {
      setPage((page) => (page + 1));
    } 
    
    if (error) {
      console.error(error);
    }
  }

  const renderPokemons = () => {
    return pokemons.map((pokemon, index) => {
      return (
        <PokemonCard
          pokemon={pokemon}
          key={index}
        />
      );
    });
  }

  return (
    <InfiniteScroll
      initialLoad={false}
      hasMore={true} 
      loadMore={loadMore}
      loader={loader}
    >
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
            <h2 className="mt-2">
              Catch Pokemon App
            </h2>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() => navigate('/my-pokemon/')}
              className="my-4"
              color="success"
            >
              My Pokemon
            </Button>
          </Col>
        </Row>
        <Row>
          {renderPokemons()}
        </Row>
      </Container>
    </div>
    </InfiniteScroll>
  );
}

export default PokemonList;
