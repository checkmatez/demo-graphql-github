import { gql } from 'apollo-boost';

export const MY_REPOS_QUERY = gql`
  query myRepos {
    viewer {
      repositories(first: 10) {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    }
  }
`;

export const REPO_BY_ID = gql`
  query repoById($id: ID!) {
    node(id: $id) {
      id
      ... on Repository {
        id
        name
        description
      }
    }
  }
`;

export const CHANGE_DESCRIPTION_NAME = gql`
  mutation changeDescriptionName($id: ID!, $description: String!, $name: String) {
    updateRepository(input: { repositoryId: $id, description: $description, name: $name }) {
      clientMutationId
      repository {
        id
        name
        description
      }
    }
  }
`;
