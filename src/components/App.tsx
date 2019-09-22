import { ApolloProvider } from '@apollo/react-hooks';
import { CSSReset, Flex, theme, ThemeProvider } from '@chakra-ui/core';
import ApolloClient from 'apollo-boost';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { RepositoryCard } from './RepositoryCard';
import { RepositoryList } from './RepositoryList';

if (!process.env.REACT_APP_GITHUB_TOKEN) {
  throw new Error('Please provide REACT_APP_GITHUB_TOKEN env.');
}

const GITHUB_API = 'https://api.github.com/graphql';

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <Flex height="100vh" justifyContent="center" alignItems="center" bg="#f5f5f5">
      <Flex flexDirection="column" borderRadius="10px" padding={5} bg="white" as="main">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact>
              <RepositoryList />
            </Route>
            <Route path="/repo/:id" exact>
              <RepositoryCard />
            </Route>
          </Switch>
        </BrowserRouter>
      </Flex>
    </Flex>
  </ThemeProvider>
);
