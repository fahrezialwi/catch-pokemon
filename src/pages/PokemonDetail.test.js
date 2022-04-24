import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PokemonDetail from "./PokemonDetail";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.graphcdn.app/',
  cache: new InMemoryCache()
});

test('render pokemon id text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText(/Pokemon ID/);
  expect(text).toBeInTheDocument();
});

test('render types text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Types');
  expect(text).toBeInTheDocument();
});


test('render abilities text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Abilities');
  expect(text).toBeInTheDocument();
});


test('render moves text', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    </ApolloProvider>
  );
  const text = screen.getByText('Moves');
  expect(text).toBeInTheDocument();
});

test('click catch button', () => {
  render(
    <ApolloProvider client={client}>
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    </ApolloProvider>
  );
  const button = screen.getByTestId('button-catch');
  userEvent.click(button)
  const text = screen.getByText('Catching...')
  expect(text).toBeInTheDocument();
});