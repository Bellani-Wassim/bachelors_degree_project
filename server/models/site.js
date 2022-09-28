module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    id_site: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    nom_site: {
      type: DataTypes.STRING(50),
    },
  });

  return Site;
};
