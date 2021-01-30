import { prisma } from "../../../server";

export default {
  Mutation: {
    upload: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { caption, location, files } = args;
      const post = await prisma.post.create({
        data: {
          caption,
          location,
          user: { connect: { id: user.id } },
        },
      });
      files.forEach(
        async (file) =>
          await prisma.file.create({
            data: {
              url: file,
              post: {
                connect: {
                  id: post.id,
                },
              },
            },
          })
      );
      return post;
    },
  },
};
