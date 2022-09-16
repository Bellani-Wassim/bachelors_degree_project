module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
    },
  });

  return Site;
};
