import { prisma } from "../../../server";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id, location, caption, action } = args;
      const post = await prisma.post.count({
        where: {
          AND: [
            {
              id,
            },
            {
              user: { id: user.id },
            },
          ],
        },
      });
      if (post !== 0) {
        if (action === EDIT) {
          await prisma.post.update({
            where: { id: id },
            data: { location, caption },
          });
          return true;
        } else if (action === DELETE) {
          await prisma.comment.deleteMany({
            where: {
              postId: id,
            },
          });
          await prisma.like.deleteMany({
            where: {
              postId: id,
            },
          });
          await prisma.file.deleteMany({
            where: {
              postId: id,
            },
          });
          await prisma.post.delete({ where: { id } });
          return true;
        }
      } else {
        throw Error("You don't have authentication");
      }
    },
  },
};
