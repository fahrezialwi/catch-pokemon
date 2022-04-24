import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

const data = {
  id: 1,
  image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
}

test('render owned text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonCard pokemon={data}/>
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText(/Owned:/);
  expect(text).toBeInTheDocument();
});
