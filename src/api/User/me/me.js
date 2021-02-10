import { prisma } from "../../../server";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return await prisma.user.findUnique({
        where: { id: user.id },
      });
    },
  },
};
