const models = require('../../../models');

const resolvers = {
  Mutation: {
    updatePost: async (_, args, {}) => {
      try {
        const existPost = await models.post.findOne({
          where: {
            id: args.id,
          },
        });
        if (existPost) {
          await models.post.update(
            { ...args },
            {
              where: {
                id: args.id,
              },
            }
          );
          const updatedPost = await models.post.findOne({
            where: {
              id: args.id,
            },
          });
          return {
            ok: true,
            post: updatedPost,
            error: null,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          post: null,
          error: 'update post failed',
        };
      }
    },
  },
};

module.exports = resolvers;
