const models = require('../../../models');
const createJWT = require('../../../utils/createJWT');

const resolvers = {
  Mutation: {
    signIn: async (_, { email, password }, {}) => {
      const existUser = await models.user.findOne({
        where: {
          email,
          password,
        },
      });
      if (!existUser) {
        return {
          ok: false,
          token: null,
          error: 'not valid email',
        };
      }
      // let valid = await existUser.comparePassword(args.password, existUser.password);

      // if (!valid) {
      //   return {
      //     ok: false,
      //     token: null,
      //     error: 'not valid password',
      //   };
      // }
      const token = createJWT(existUser.id);

      return {
        ok: true,
        token,
        error: null,
      };
    },
  },
};

module.exports = resolvers;
