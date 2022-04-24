import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyPokemonCard from "./MyPokemonCard";
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

test('render text nickname', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MyPokemonCard pokemon={data}/>
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Nickname:');
  expect(text).toBeInTheDocument();
});

test('render text release', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MyPokemonCard pokemon={data}/>
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Release');
  expect(text).toBeInTheDocument();
});
