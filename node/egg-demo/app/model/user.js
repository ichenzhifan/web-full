module.exports = app => {
  const { STRING, NUMBER } = app.Sequelize;
  const User = app.model.define('user', {
    name: STRING(30),
    
    address: STRING(500)
  });

  User.sync({ force: true });

  return User;
};
