import { Flex, Text, CircularProgress } from '@chakra-ui/core';
import React from 'react';

import { useMyReposQuery } from '../types/graphql';
import { StyledLink } from './StyledLink';

export const RepositoryList: React.FC = () => {
  const { data, loading, error } = useMyReposQuery();

  if (error) {
    return <Text>{`Error! ${JSON.stringify(error, null, 2)}`}</Text>;
  }

  return (
    <Flex flexDirection="column">
      <Text fontSize="xl" fontWeight="bold" alignSelf="center">
        Мои репозитории
      </Text>
      {loading && <CircularProgress isIndeterminate />}
      <table>
        <thead>
          <tr>
            <td>
              <Text fontWeight="bold">Наименование</Text>
            </td>
            <td>
              <Text fontWeight="bold">Описание</Text>
            </td>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.viewer.repositories.edges &&
            data.viewer.repositories.edges.map(edge =>
              edge && edge.node ? (
                <tr key={edge.node.id}>
                  <td>
                    <StyledLink to={`/repo/${edge.node.id}`}>
                      <Text color="blue.600">{edge.node.name}</Text>
                    </StyledLink>
                  </td>
                  <td>
                    <Text>{edge.node.description}</Text>
                  </td>
                </tr>
              ) : null,
            )}
        </tbody>
      </table>
    </Flex>
  );
};
