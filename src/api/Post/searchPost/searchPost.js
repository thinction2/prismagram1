import { prisma } from "../../../server";

export default {
  Query: {
    searchPost: async (_, args) => {
      const { term } = args;
      return await prisma.post.findMany({
        where: {
          OR: [
            { location: { startsWith: term } },
            { caption: { startsWith: term } },
          ],
        },
      });
    },
  },
};
