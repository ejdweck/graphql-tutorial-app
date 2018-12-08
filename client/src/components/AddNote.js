import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getNotesQuery = gql`
  {
    notes {
      title
      id
    }
  }
`
