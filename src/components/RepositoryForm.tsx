import { Box, Text, CircularProgress, Flex, Input, Stack, Button } from '@chakra-ui/core';
import React from 'react';

interface RepositoryForm {
  onSubmit: (data: { name: string; description: string }) => void;
  loading: boolean;
  initialName?: string;
  initialDescription?: string;
}

export const RepositoryForm: React.FC<RepositoryForm> = ({
  onSubmit,
  loading,
  initialName = '',
  initialDescription = '',
}) => {
  const [name, setName] = React.useState(initialName);
  const [description, setDescription] = React.useState(initialDescription);

  const handleNameChange: React.ReactEventHandler<HTMLInputElement> = e =>
    setName(e.currentTarget.value);
  const handleDescriptionChange: React.ReactEventHandler<HTMLInputElement> = e =>
    setDescription(e.currentTarget.value);

  const handleSubmit: React.FormEventHandler = e => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <Stack as="form" onSubmit={handleSubmit}>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text as="label" mr={2}>
          Наименование:
        </Text>
        <Input value={name} onChange={handleNameChange} maxWidth={48} />
      </Flex>
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Text as="label" mr={2}>
          Описание:
        </Text>
        <Input value={description} onChange={handleDescriptionChange} maxWidth={48} />
      </Flex>
      <Button type="submit" isDisabled={loading} isLoading={loading} variantColor="purple">
        Сохранить
      </Button>
    </Stack>
  );
};
