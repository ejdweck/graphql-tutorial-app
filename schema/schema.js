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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        //return _.filter(notes, {userId: parent.id})
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
        //return _.find(users, { id: parent.userId })
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
        //return _.find(notes, { id: args.id });
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return _.find(users, { id: args.id });
      }
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        //return notes;
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        //return users;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});