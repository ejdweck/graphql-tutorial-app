const graphql = require('graphql');
const _ = require('lodash');
const Pad = require('../models/pad');
const Note = require('../models/note');
const User = require('../models/user');

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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    layout: { type: GraphQLString },
    pads: {
      type: new GraphQLList(PadType),
      resolve(parent, args) {
        return Pad.find({ userId: parent.id })
      }
    }
  })
});

const PadType = new GraphQLObjectType({
  name: 'Pad',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId)
      }
    },
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
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      }
    },
    users: {
      type: new GraphQLList(UserType),
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.find({});
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
        userId: { type: new GraphQLNonNull(GraphQLID) }
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
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        let user = new User({
          name: args.name,
          layout: null,
        })
        return user.save();
      }
    },
    updateUserLayout: {
      type: UserType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        layout: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          const date = Date().toString()
          User.findOneAndUpdate(
            {"_id": args.userId},
            { "$set":{layout: args.layout}},
            {"new": true} //returns new document
          ).exec((err, res) => {
            if(err) {
              reject(err)
            } else {
              resolve(res)
            }
          })
        })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
