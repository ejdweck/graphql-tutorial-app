const graphql = require('graphql');
const _ = require('lodash');

// grab these functions from this package
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy data
var notes = [
  {title: 'Dry Cleaning', category: 'Home', id: '1'},
  {title: 'Research Koa', category: 'Work', id: '2'},
  {title: 'Winter Boots', category: 'Buy', id: '3'},
];

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    category: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    note: {
      type: NoteType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from DB/ other source
        return _.find(notes, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});