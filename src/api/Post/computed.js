import { prisma } from "../../server";

export default {
  Post: {
    isLiked: async (parent, _, { request }) => {
      const { user } = request;
      const { id } = parent;
      const existLike = await prisma.like.count({
        where: {
          AND: [
            {
              user: { id: user.id },
            },
            {
              post: { id: id },
            },
          ],
        },
      });
      return existLike === 1;
    },
    likeCount: async (parent) => {
      const likes = prisma.like.count({ where: { postId: parent.id } });
      return likes;
    },
    commentCount: async (parent) => {
      const comments = prisma.comment.count({ where: { postId: parent.id } });
      return comments;
    },
  },
};
