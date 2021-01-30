import { prisma } from "../../../server";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { id } = args;
      const user = await prisma.user.findUnique({ where: { id: id } });
      const posts = await prisma.post.findMany({ where: { userId: user.id } });
      return {
        user,
        posts,
      };
    },
  },
};
