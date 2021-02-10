import { prisma } from "../../../server";

export default {
  Mutation: {
    addComment: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { text, postId } = args;
      const comment = await prisma.comment.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
          text,
        },
        include: { user: true },
      });
      return comment;
    },
  },
};
