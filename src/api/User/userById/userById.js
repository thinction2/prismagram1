import { prisma } from "../../../server";

export default {
  Query: {
    userById: async (_, args) => {
      const { id } = args;
      const user = await prisma.user.findUnique({
        where: { id },
        include: { posts: { select: { id: true } } },
      });
      console.log(user);
      return user;
    },
  },
};
