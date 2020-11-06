const models = require('../../../models');

const resolvers = {
  Mutation: {
    deleteReply: async (_, { id }) => {
      try {
        await models.reply.destroy({
          where: {
            id,
          },
        });
        return {
          ok: true,
          error: null,
        };
      } catch (err) {
        return {
          ok: false,
          error: '댓글 삭제에 실패하였습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
