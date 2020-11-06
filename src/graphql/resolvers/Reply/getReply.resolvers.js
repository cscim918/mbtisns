const models = require('../../../models');

const resolvers = {
  Query: {
    getReply: async (_, { id }) => {
      try {
        const existReply = await models.reply.findOne({
          where: {
            id,
          },
        });
        if (existReply) {
          return {
            ok: true,
            reply: existReply,
            error: null,
          };
        }
      } catch (error) {
        console.log(error);
        return {
          ok: false,
          reply: null,
          error: '해당되는 게시글이 없습니다.',
        };
      }
    },
  },
};

module.exports = resolvers;
