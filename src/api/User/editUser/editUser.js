import { prisma } from "../../../server";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { username, avatar, email, firstName, lastName, bio } = args;
      return await prisma.user.update({
        where: { id: user.id },
        data: { username, avatar, email, firstName, lastName, bio },
      });
    },
  },
};
