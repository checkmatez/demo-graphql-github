import { gql } from 'apollo-boost';

export const REPO_FRAGMENT = gql`
  fragment Repo on Repository {
    id
    name
    description
  }
`;

export const MY_REPOS_QUERY = gql`
  query myRepos {
    viewer {
      repositories(first: 10) {
        edges {
          node {
            ...Repo
          }
        }
      }
    }
  }
  ${REPO_FRAGMENT}
`;

export const REPO_BY_ID = gql`
  query repoById($id: ID!) {
    node(id: $id) {
      id
      ... on Repository {
        ...Repo
      }
    }
  }
  ${REPO_FRAGMENT}
`;

export const CHANGE_DESCRIPTION_NAME = gql`
  mutation changeDescriptionName($id: ID!, $description: String!, $name: String) {
    updateRepository(input: { repositoryId: $id, description: $description, name: $name }) {
      clientMutationId
      repository {
        ...Repo
      }
    }
  }
  ${REPO_FRAGMENT}
`;
