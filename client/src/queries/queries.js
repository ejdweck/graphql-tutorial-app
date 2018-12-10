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

const getUser = gql`
  {
    users {
      name
      id
      layout
    }
  }
`

const updateUserLayoutMutation = gql`
  mutation($layout: String!, $userId: ID!) {
    updateUserLayout(layout: $layout, userId: $userId) {
      layout
    }
  }
`
const getCurrentLayout = gql`
  {
    users {
      layout
    }
  }
`
export {
  getPadsWithNotesQuery,
  addPadMutation,
  getUser,
  updateUserLayoutMutation,
  getCurrentLayout,
};