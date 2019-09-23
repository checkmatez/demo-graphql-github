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
