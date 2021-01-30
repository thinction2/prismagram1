import { prisma } from "../../../server";

export default {
  Query: {
    seeFeed: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const following = await prisma.user.findMany({
        where: {
          follower: { some: { id: user.id } },
        },
      });
      const followingUserId = [...following.map((user) => user.id), user.id];
      return await prisma.post.findMany({
        where: {
          userId: { in: followingUserId },
        },
        orderBy: { createdAt: "desc" },
      });
    },
  },
};
