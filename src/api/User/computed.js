import { prisma } from "../../server";

export default {
  User: {
    fullName: (parent) => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    // postsCount: ({ id }) => prisma.post.count({ where: { user: { id } } }),
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
    followingCount: (parent) => parent.following.length,
    followerCount: (parent) => parent.follower.length,
    postsCount: (parent) => parent.posts.length,
  },
};
