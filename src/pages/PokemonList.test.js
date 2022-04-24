import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonList from "./PokemonList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

test('render application title', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Catch Pokemon App');
  expect(text).toBeInTheDocument();
});
