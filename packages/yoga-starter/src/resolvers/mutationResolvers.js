// server/resolvers/mutationResolvers.js
import { users } from "../_db.js";
import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub(); // Create an instance of PubSub
export const mutationResolvers = {
  Mutation: {
    createUser: (parent, { input }) => {
      const newUser = { id: String(users.length + 1), ...input };
      users.push(newUser);
      return { user: newUser, msg: `user added successfully` };
    },
    updateUser: (parent, { id, input }) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        if (input.name) users[index].name = input.name;
        if (input.email) users[index].email = input.email;
        return { user: users[index], msg: 'User updated successfully ' };
      }
      return { msg: `Invalid userID` };
    },
    deleteUser: (parent, { id }) => {
      const index = users.findIndex(user => user.id === id);
      if (index !== -1) {
        const deletedUser = users.splice(index, 1)[0];
        pubsub.publish('USER_DELETED', { userDeleted: deletedUser });
        return {
          id: deletedUser.id,
          success: true,
          message: `user deleted successfully`

        }
      }
      return {
        id,
        success: false,
        message: 'User not found',
      };
    }
  },
  Subscription: {
    userDeleted: {
      subscribe: () => pubsub.asyncIterableIterator(['USER_DELETED'])
    },
    greetings: {
      subscribe: () => pubsub.asyncIterableIterator(['GREETINGS'])
    }
  }
};

setInterval(() => {
  pubsub.publish('GREETINGS', { greetings: 'Hello, World!' });
}, 5000);


// const resolvers = {
//   Query: {
//     users: () => users,
//     user: (parent, { id }) => users.find(user => user.id === id),
//   },
//   Mutation: {
//     createUser: (parent, { input }) => {
//       const newUser = { id: uuidv4(), ...input };
//       users.push(newUser);
//       return newUser;
//     },
//     updateUser: (parent, { id, input }) => {
//       const index = users.findIndex(user => user.id === id);
//       if (index !== -1) {
//         if (input.name) users[index].name = input.name;
//         if (input.email) users[index].email = input.email;
//         return users[index];
//       }
//       return null; // or throw an error if preferred
//     },
//     deleteUser: (parent, { id }) => {
//       const userIndex = users.findIndex(user => user.id === id);
//       if (userIndex === -1) {
//         return {
//           id,
//           success: false,
//           message: 'User not found',
//         };
//       }
//       const deletedUser = users.splice(userIndex, 1)[0];
//       return {
//         id: deletedUser.id,
//         success: true,
//         message: 'User successfully deleted',
//       };
//     },
//   },
// };

/** Query: {
        users: async (_, args, context, info) => {
            const { client } = context;
            const requestedFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
            const columns = requestedFields.length ? requestedFields.join(', ') : '*';
            const query = `SELECT ${columns} FROM users`;
            const res = await client.query(query);
            return res.rows;
        },
        user: async (_, { id }, context, info) => {
            const { client } = context;
            const requestedFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
            const columns = requestedFields.length ? requestedFields.join(', ') : '*';
            const query = `SELECT ${columns} FROM users WHERE id = $1`;
            const res = await client.query(query, [id]);
            return res.rows[0];
        }
    }, */