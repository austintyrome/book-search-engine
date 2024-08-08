const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.req.user) {
        return await User.findById(context.req.user._id).populate('savedBooks');
      }
      throw new Error('Not authenticated');
    },
    books: async () => {
      // Replace with actual logic to get books
      return [];
    },
  },
  Mutation: {
    createUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new Error("Can't find this user");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new Error('Wrong password!');
      }
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (parent, { bookInput }, context) => {
      if (context.req.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.req.user._id },
          { $addToSet: { savedBooks: bookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
    deleteBook: async (parent, { bookId }, context) => {
      if (context.req.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.req.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      }
      throw new Error('Not authenticated');
    },
  },
};

module.exports = resolvers;