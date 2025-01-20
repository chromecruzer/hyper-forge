// server/resolvers/queryResolvers.js   
import { users } from "../_db.js";
export const queryResolvers = {
  Query: {
    hello: () => 'world',
    users: (_,args,context,info) => {
      const requestedFields = info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
      console.log(requestedFields)
      return users  // or u can just do like this () => users
    },
    user: (parent, { id }) => users.find(user => user.id === id)
  },
};
