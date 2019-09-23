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

  const [changeDescriptionName, changeDescriptionNameResult] = useChangeDescriptionNameMutation({
    onCompleted: () => history.push('/'),
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
    <RepositoryForm
      onSubmit={data => changeDescriptionName({ variables: { id, ...data } })}
      loading={changeDescriptionNameResult.loading}
      initialName={repository.name}
      initialDescription={repository.description || ''}
    />
  );
};
