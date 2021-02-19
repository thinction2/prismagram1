import { prisma } from "../../../server";

export default {
  Query: {
    seeUser: async (_, args) => {
      const { username } = args;
      const user = await prisma.user.findUnique({
        where: { username },
        include: {
          posts: { select: { files: true, id: true } },
          following: true,
          follower: true,
        },
      });
      return user;
    },
  },
};
