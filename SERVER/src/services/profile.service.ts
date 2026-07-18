import { prisma } from "../config/prisma";

export const updateProfileImage = async (userId: number, imageUrl: string) => {
  return await prisma.users.update({
    where: {
      id: userId,
    },

    data: {
      profileImage: imageUrl,
    },

    select: {
      id: true,
      username: true,
      fullName: true,
      profileImage: true,
    },
  });
};
