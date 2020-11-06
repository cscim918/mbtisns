const { NEW_MESSAGE } = require('../../constant');

const resolvers = {
  Subscription: {
    newMessageSubscription: {
      subscribe: (_, __, { pubsub }) => {
        console.log(pubsub);
        return pubsub.asyncIterator([NEW_MESSAGE]);
      },
    },
  },
};

module.exports = resolvers;
