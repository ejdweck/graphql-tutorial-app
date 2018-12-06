const graphql = require('graphql');
const _ = require('lodash');

// grab these functions from this package
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
} = graphql;

// dummy data
var notes = [
  {title: 'Dry Cleaning', category: 'Home', id: '1', userId: '1'},
  {title: 'Koa', category: 'Work', id: '1', userId: '1'},
  {title: 'Winter', category: 'Buy', id: '1', userId: '1'},
  {title: 'Dry', category: 'Home', id: '2', userId: '2'},
  {title: 'Koa', category: 'Work', id: '2', userId: '2'},
  {title: 'Winter', category: 'Buy', id: '2', userId: '2'},
  {title: 'Dry', category: 'Home', id: '3', userId: '3'},
  {title: 'Koa', category: 'Work', id: '3', userId: '3'},
  {title: 'Winter Boots', category: 'Buy', id: '3', userId: '3'},
];
var users = [
  {name: 'Bill', age: 28, id: '1'},
  {name: 'John', age: 18, id: '2'},
  {title: 'Sandy', age: 22, id: '3'},
];

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return _.find(users, { id: parent.userId })
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});



const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    note: {
      type: NoteType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from DB/ other source
        return _.find(notes, { id: args.id });
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(users, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});