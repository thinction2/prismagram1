import { prisma } from "../../../server";

export default {
  Mutation: {
    toggleLike: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      try {
        const { postId } = args;
        const { user } = request;
        const isLike = await prisma.like.count({
          where: {
            AND: [{ user: { id: user.id } }, { post: { id: postId } }],
          },
        });
        if (isLike === 0) {
          await prisma.like.create({
            data: {
              user: { connect: { id: user.id } },
              post: { connect: { id: postId } },
            },
          });
          return true;
        } else {
          await prisma.like.delete({
            where: {
              likeRelation: {
                userId: user.id,
                postId: postId,
              },
            },
          });
          return false;
        }
      } catch {
        return Error("Something is wrong.");
      }
    },
  },
};
