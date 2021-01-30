import { prisma } from "../../../server";

export default {
  Query: {
    me: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const userProfile = await prisma.user.findUnique({
        where: { id: user.id },
      });
      const posts = await prisma.post.findMany({ where: { userId: user.id } });
      return { user: userProfile, posts };
    },
  },
};
