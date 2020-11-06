const models = require('../../../models');

const resolvers = {
  Mutation: {
    updateUser: async (_, args, {}) => {
      try {
        const existUser = await models.user.findOne({
          where: {
            id: args.id,
          },
        });
        if (existUser) {
          await models.user.update(
            { ...args },
            {
              where: {
                id: args.id,
              },
            }
          );
          const updatedUser = await models.user.findOne({
            where: {
              id: args.id,
            },
          });
          return {
            ok: true,
            user: updatedUser,
            error: null,
          };
        }
      } catch (error) {
        return {
          ok: false,
          user: null,
          error: 'update user failed',
        };
      }
    },
  },
};

module.exports = resolvers;
