import { Box, Text } from '@chakra-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';

interface Params {
  id: string;
}

export const RepositoryCard: React.FC = () => {
  const { id } = useParams<Params>();

  return (
    <Box>
      <Text>Я карточка репозитория!</Text>
      <Text>{`id = ${id}`}</Text>
    </Box>
  );
};
