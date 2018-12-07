const graphql = require('graphql');
const _ = require('lodash');
const Pad = require('../models/pad');
const Note = require('../models/note');

// grab these functions from this package
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const PadType = new GraphQLObjectType({
  name: 'Pad',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({ padId: parent.id })
      }
    }
  })
});

const NoteType = new GraphQLObjectType({
  name: 'Note',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    //category: { type: GraphQLString },
    pad: {
      type: PadType,
      resolve(parent, args) {
        return Pad.findById(parent.padId)
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
        return Note.findById(args.id);
      }
    },
    pad: {
      type: PadType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Pad.findById(args.id);
      }
    },
    notes: {
      type: new GraphQLList(NoteType),
      resolve(parent, args) {
        return Note.find({});
      }
    },
    pads: {
      type: new GraphQLList(PadType),
      resolve(parent, args) {
        return Pad.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name:'Mutation',
  fields: {
    addPad: {
      type: PadType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let pad = new Pad({
          name: args.name,
        })
        return pad.save();
      }
    },
    addNote: {
      type: NoteType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        padId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let note = new Note({
          title: args.title,
          category: args.category,
          padId: args.padId,
        })
        return note.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});