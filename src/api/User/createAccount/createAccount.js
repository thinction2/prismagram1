import { prisma } from "../../../server";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, avatar, email, firstName, lastName, bio } = args;
      const user = await prisma.user.create({
        data: { username, avatar, email, firstName, lastName, bio },
      });
      return user;
    },
  },
};
