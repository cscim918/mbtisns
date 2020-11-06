'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.post = require('./post')(sequelize, Sequelize);
db.reply = require('./reply')(sequelize, Sequelize);
db.chatting = require('./chatting')(sequelize, Sequelize);
db.message = require('./message')(sequelize, Sequelize);
db.UserChatting = require('./UserChatting')(sequelize, Sequelize);

db.user.hasMany(db.post, { foreignKey: 'user_id', targetKey: 'id' });
db.post.belongsTo(db.user, { foreignKey: 'user_id', sourceKey: 'id' });

db.user.hasMany(db.reply, { foreignKey: 'user_id', targetKey: 'id' });
db.reply.belongsTo(db.user, { foreignKey: 'user_id', sourceKey: 'id' });

db.post.hasMany(db.reply, { foreignKey: 'post_id', targetKey: 'id' });
db.reply.belongsTo(db.post, { foreignKey: 'post_id', sourceKey: 'id' });

db.chatting.hasMany(db.message, { foreignKey: 'chatting_id', targetKey: 'id' });
db.message.belongsTo(db.chatting, { foreignKey: 'chatting_id', sourceKey: 'id' });

db.user.belongsToMany(db.chatting, { through: 'UserChatting' });
db.chatting.belongsToMany(db.user, { through: 'UserChatting' });

module.exports = db;
