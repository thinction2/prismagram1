import { prisma } from "../../../server";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args) => {
      const { email, secret } = args;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user.loginSecret === secret) {
        await prisma.user.update({
          where: { id: user.id },
          data: { loginSecret: "" },
        });
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/secret conbination");
      }
    },
  },
};
