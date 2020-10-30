const jwt = require('jsonwebtoken');
require('dotenv').config();

const createJWT = (id) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_TOKEN || ''
  );
  return token;
};

module.exports = createJWT;
