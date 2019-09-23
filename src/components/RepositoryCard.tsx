import { Box, Text, CircularProgress, Flex } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useRepoByIdQuery } from '../types/graphql';

interface Params {
  id: string;
}

export const RepositoryCard: React.FC = () => {
  const { id } = useParams<Params>();
  const { data, loading, error } = useRepoByIdQuery({
    variables: { id },
  });

  if (error) {
    return <Text>{`Error! ${JSON.stringify(error, null, 2)}`}</Text>;
  }

  if (loading || !data) {
    return <CircularProgress isIndeterminate />;
  }

  if (!data.node || data.node.__typename !== 'Repository') {
    return <Text>😵 Упс! Кажется такого репозитория нет...</Text>;
  }

  const repository = data.node;

  return (
    <Box>
      <Flex flexDirection="row">
        <Text>Наименование: </Text>
        <Text>{repository.name}</Text>
      </Flex>
      <Flex flexDirection="row">
        <Text>Описание: </Text>
        <Text>{repository.description}</Text>
      </Flex>
    </Box>
  );
};
