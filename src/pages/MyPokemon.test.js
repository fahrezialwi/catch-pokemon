import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MyPokemon from "./MyPokemon";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

test('render my pokemon text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <MyPokemon />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('My Pokemon');
  expect(text).toBeInTheDocument();
});
