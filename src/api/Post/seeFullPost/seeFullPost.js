import { prisma } from "../../../server";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      const post = await prisma.post.findUnique({ where: { id } });
      const comments = await prisma.comment.findMany({
        where: { postId: id },
        include: { user: true },
      });
      const files = await prisma.file.findMany({
        where: { postId: id },
      });
      return { post, comments, files };
    },
  },
};
