import { Box, Text, CircularProgress, Flex } from '@chakra-ui/core';
import React from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useRepoByIdQuery, useChangeDescriptionNameMutation } from '../types/graphql';
import { RepositoryForm } from './RepositoryForm';

interface Params {
  id: string;
}

export const RepositoryCard: React.FC = () => {
  const { id } = useParams<Params>();
  const history = useHistory();
  const { data, loading, error } = useRepoByIdQuery({
    variables: { id },
  });

  const [changeDescriptionName, changeDescriptionNameResult] = useChangeDescriptionNameMutation({});

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
    <RepositoryForm
      onSubmit={({ name, description }) => {
        changeDescriptionName({
          variables: { id, name, description },
          optimisticResponse: {
            updateRepository: {
              clientMutationId: null,
              repository: {
                id,
                name,
                description,
                __typename: 'Repository',
              },
              __typename: 'UpdateRepositoryPayload',
            },
          },
        });
        history.push('/');
      }}
      loading={changeDescriptionNameResult.loading}
      initialName={repository.name}
      initialDescription={repository.description || ''}
    />
  );
};
