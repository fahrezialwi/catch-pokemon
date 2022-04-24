import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import MyPokemonCard from "../components/MyPokemonCard"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)

function MyPokemon () {
  let myPokemon = JSON.parse(localStorage.getItem('pokemon_data'));
  const [pokemons, setPokemons] = useState(myPokemon ? myPokemon : []);

  const releasePokemon = (nickname) => {
    MySwal.fire({
      title: 'Confirm Release',
      text: `Are you sure want to release ${nickname}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#7066e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire(
          'Bye bye...',
          'Your pokemon has released.',
          'success'
        )

        const oldData = JSON.parse(localStorage.getItem("pokemon_data"));
        const newData = oldData.filter((item) => item.nickname !== nickname);
        localStorage.setItem("pokemon_data", JSON.stringify(newData));
        setPokemons(newData);
      }
    });
  }

  const renderPokemon = () => {
    if (pokemons.length > 0) {
      return pokemons.map((pokemon) => {
        return (
          <MyPokemonCard
            key={pokemon.nickname}
            pokemon={pokemon}
            releasePokemon={releasePokemon}
          />
        )
      });
    } else {
      return <Col>No Data</Col>
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h2 className="my-4">
              My Pokemon  
            </h2>
          </Col>
        </Row>
        <Row>
          {renderPokemon()}
        </Row>
      </Container>
    </div>
  );
}

export default MyPokemon;