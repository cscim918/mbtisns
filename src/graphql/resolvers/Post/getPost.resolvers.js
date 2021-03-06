const models = require('../../../models');

const resolvers = {
  Query: {
    getPost: async (_, { id }) => {
      try {
        const existPost = await models.post.findOne({
          where: {
            id,
          },
        });
        if (existPost) {
          return {
            ok: true,
            post: existPost,
            error: null,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          post: null,
          error: '해당되는 게시글이 없습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
