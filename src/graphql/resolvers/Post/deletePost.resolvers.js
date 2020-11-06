const models = require('../../../models');

const resolvers = {
  Mutation: {
    deletePost: async (_, { id, title }) => {
      try {
        const existPost = await models.post.findOne({
          where: {
            id,
            title,
          },
        });
        if (existPost) {
          await models.post.destroy({
            where: {
              id,
              title,
            },
          });
          return {
            ok: true,
            error: null,
          };
        }
      } catch (err) {
        return {
          ok: false,
          error: '게시글 삭제에 실패하였습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
