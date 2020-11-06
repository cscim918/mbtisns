const models = require('../../../models');
const createJWT = require('../../../utils/createJWT');

const resolvers = {
  Mutation: {
    signIn: async (_, { email, password }, {}) => {
      try {
        const existUser = await models.user.findOne({
          where: {
            email,
            password,
          },
        });
        // const token = createJWT(existUser.id);
        if (existUser) {
          return {
            ok: true,
            token: null,
            error: null,
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
      } catch (error) {
        return {
          ok: false,
          token: null,
          error: 'not valid email',
        };
      }
    },
  },
};

module.exports = resolvers;
