import { prisma } from "../../../server";

export default {
  Mutation: {
    toggleFollow: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id } = args;
      try {
        const isFollow = await prisma.user.count({
          where: {
            AND: [
              {
                id: user.id,
              },
              {
                following: { some: { id: { equals: id } } },
              },
            ],
          },
        });
        if (isFollow === 0) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              following: { connect: { id: id } },
            },
          });
          return "Connected Following";
        } else {
          await prisma.user.update({
            where: {
              id: user.id,
            },

            data: {
              following: { disconnect: { id: id } },
            },
          });
          return "Disconnected Following";
        }
      } catch {
        throw Error("Something Wroing");
      }
    },
  },
};
