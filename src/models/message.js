'use strict';

module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    message: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  });
  return message;
};
