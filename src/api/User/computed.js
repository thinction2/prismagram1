import { prisma } from "../../server";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, _, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { id: parentId } = parent;
      try {
        const existFollowing = await prisma.user.count({
          where: {
            AND: [{ id: user.id }, { following: { some: { id: parentId } } }],
          },
        });
        return existFollowing === 1;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    },
  },
};
