import gql from 'graphql-tag';

export const MUTATE_CREATE_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      email
      name
    }
  }
`;
