import { Text } from '@chakra-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { RepositoryVisibility, useCreateRepositoryMutation } from '../types/graphql';
import { RepositoryForm } from './RepositoryForm';

export const RepositoryNew: React.FC = () => {
  const history = useHistory();
  const [createRepository, { loading, error }] = useCreateRepositoryMutation({
    onCompleted: () => history.push('/'),
  });

  if (error) {
    return <Text>{`Error! ${JSON.stringify(error, null, 2)}`}</Text>;
  }

  return (
    <RepositoryForm
      onSubmit={({ name, description }) =>
        createRepository({
          variables: { input: { name, description, visibility: RepositoryVisibility.Public } },
        })
      }
      loading={loading}
    />
  );
};
