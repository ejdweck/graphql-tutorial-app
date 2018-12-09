import { gql } from 'apollo-boost';

const getPadsWithNotesQuery = gql`
  {
    pads {
      id
      name
      notes {
        title
        id
      }
    }
  }
`

const addPadMutation = gql`
  mutation($name: String!, $userId: ID!) {
    addPad(name: $name, userId: $userId) {
      name
      user {
        name
        id
      }
    }
  }
`

export { getPadsWithNotesQuery, addPadMutation };