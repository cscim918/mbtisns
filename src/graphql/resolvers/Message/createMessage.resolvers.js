const { NEW_MESSAGE } = require('../../constant');
const models = require('../../../models');

const resolvers = {
  Mutation: {
    createMessage: async (_, args, { pubsub }) => {
      try {
        const message = await models.message.create({
          ...args,
        });

        if (message) {
          pubsub.publish(NEW_MESSAGE, { newMessageSubscription: message });
          return {
            ok: true,
            message,
            error: '',
          };
        }
      } catch (error) {
        console.error('Creating message failed ' + error);
        return {
          ok: false,
          message: null,
          error: 'error',
        };
      }
    },
  },
};

module.exports = resolvers;
