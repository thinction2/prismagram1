import { prisma } from "../../../server";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        avatar,
        email,
        firstName = "",
        lastName = "",
        bio = "",
      } = args;
      const exists = await prisma.user.findMany({
        where: { OR: [{ username: username }, { email: email }] },
      });
      console.log(exists);
      if (!exists) {
        throw Error("This username / email is already taken");
      } else {
        await prisma.user.create({
          data: { username, avatar, email, firstName, lastName, bio },
        });
        return true;
      }
    },
  },
};
