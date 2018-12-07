const graphql = require('graphql');
const _ = require('lodash');

// grab these functions from this package
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
var notes = [
  {title: 'Get the plants watered', category: 'Home', id: '1', userId: '1'},
  {title: 'email john', category: 'Work', id: '1', userId: '1'},
  {title: 'sturdy leather boots', category: 'Buy', id: '1', userId: '1'},
  {title: 'finish garage organization', category: 'Home', id: '2', userId: '2'},
  {title: 'do API work', category: 'Work', id: '2', userId: '2'},
  {title: 'frying pans for kitchen', category: 'Buy', id: '2', userId: '2'},
  {title: 'carpet cleaning', category: 'Home', id: '3', userId: '3'},
  {title: 'ask for raise', category: 'Work', id: '3', userId: '3'},
  {title: 'Winter Boots', category: 'Buy', id: '3', userId: '3'},
];
var users = [
  {name: 'Bill', age: 28, id: '1'},
  {name: 'John', age: 18, id: '2'},
  {name: 'Sandy', age: 22, id: '3'},
];

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return _.filter(notes, {userId: parent.id})
      }
    }
  })
});

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
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return notes;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});