import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import { gql, useQuery } from "@apollo/client";
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

const PokemonDetail = () => {
  const [pokemonId, setPokemonId] = useState();
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonImage, setPokemonImage] = useState("");
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [pokemonAbilities, setPokemonAbilities] = useState([]);
  const [pokemonMoves, setPokemonMoves] = useState([]);
  const [isCatching, setIsCatching] = useState(false);

  const { name } = useParams();
  const navigate = useNavigate();

  const convertUpperCase = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const convertDashedWord = (value) => {
    let arr = value.split("-")
    for (let i = 0 ; i < arr.length ; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    return arr.join(" ");
  };

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      name: name,
    }
  });

  useEffect(() => {
    if (!loading) {
      setPokemonId(data.pokemon.id);
      setPokemonName(data.pokemon.name);
      setPokemonImage(data.pokemon.sprites.front_default);
      setPokemonTypes(data.pokemon.types.map((values) => values.type.name));
      setPokemonAbilities(
        data.pokemon.abilities.map((values) => values.ability.name)
      );
      setPokemonMoves(data.pokemon.moves.map((values) => values.move.name));
    } 
    
    if (error) {
      console.error(error);
    } 
  }, [loading, error, data]);

  const catchPokemon = () => {
    setIsCatching(true)
    setTimeout(() => {
      modalCatch();
      setIsCatching(false);
    }, 1500);
  }

  const modalCatch = () => {
    const getSavedData = JSON.parse(localStorage.getItem("pokemon_data"));

    if (Math.random() < 0.5) {
      MySwal.fire({
        title: 'Catch Success',
        text: "You got a Pokemon!",
        icon: 'success',
        allowOutsideClick: false,
        input: 'text',
        inputLabel: 'Enter your new Pokemon nickname',
        inputValidator: (value) => {
          const checkDuplicate = getSavedData.filter(
            (items) => items.nickname === value
          );
      
          if (!value) {
            return 'Nickname is required'
          } else if (checkDuplicate.length > 0) {
            return "Nickname already exists"
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const newData = [
            ...getSavedData,
            {
              id: pokemonId,
              name: pokemonName,
              nickname: result.value,
              image: pokemonImage,
            },
          ];
    
          localStorage.setItem("pokemon_data", JSON.stringify(newData));

          MySwal.fire({
            title: 'Success!',
            text: "Your new pokemon has been saved.",
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#7066e0',
            cancelButtonText: 'Close',
            confirmButtonText: 'Show My Pokemon'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/my-pokemon/');
            }
          });
        }
      })
    } else {
      MySwal.fire({
        title: 'Catch Failed',
        text: "Pokemon has gone.",
        icon: 'error',
      })
    }
  }

  const renderTypes = () => {
    return pokemonTypes.map((type, index) => {
      return (
        <div className="block-detail" key={index}>{convertDashedWord(type)}</div>
      );
    });
  }

  const renderAbilities = () => {
    return pokemonAbilities.map((ability, index) => {
      return (
        <div className="block-detail" key={index}>{convertDashedWord(ability)}</div>
      );
    });
  }

  const renderMoves = () => {
    return pokemonMoves.map((move, index) => {
      return (
        <div className="block-detail" key={index}>{convertDashedWord(move)}</div>
      );
    });
  }

  if (!loading) {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="6" sm="12">
              <img
                src={pokemonImage}
                alt={pokemonName}
                width="400px"
                className="img-fluid"
              />
            </Col>
            <Col md="6" sm="12" style={{'marginTop': '100px', 'marginBottom': '50px'}}>
              <h2>
                {convertUpperCase(pokemonName)}
              </h2>
              <div>Pokemon ID #{pokemonId}</div>
              <Button
                onClick={() => catchPokemon(pokemonName)}
                color="success"
                className="mt-4"
                data-testid="button-catch"
              >
                {isCatching ? 'Catching...' : 'Catch Pokemon'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2"><h5>Types</h5></Col>
            <Col md="12">{renderTypes()}</Col>
          </Row>
          <Row>
            <Col md="12" className="mt-3 mb-2"><h5>Abilities</h5></Col>
            <Col md="12">{renderAbilities()}</Col>
          </Row>
          <Row>
            <Col md="12" className="mt-3 mb-2"><h5>Moves</h5></Col>
            <Col md="12">{renderMoves()}</Col>
          </Row>
        </Container>
      </div>
    )
  } else {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="6" sm="12">
            <div style={{'height': '400px', 'paddingTop': '200px'}}>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </div> 
            </Col>
            <Col md="6" sm="12" style={{'marginTop': '100px', 'marginBottom': '50px'}}>
              <h2>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </h2>
              <div>Pokemon ID&nbsp;
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                />
              </div>
              <Button
                onClick={() => catchPokemon(pokemonName)}
                color="success"
                className="mt-4"
                data-testid="button-catch"
              >
                {isCatching ? 'Catching...' : 'Catch Pokemon'}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-2"><h5>Types</h5></Col>
            <Col md="12">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mt-3 mb-2"><h5>Abilities</h5></Col>
            <Col md="12">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mt-3 mb-2"><h5>Moves</h5></Col>
            <Col md="12">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default PokemonDetail;