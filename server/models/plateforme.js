module.exports = (sequelize, DataTypes) => {
  const Plateforme = sequelize.define('Plateforme', {
    id: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
    },
  });

  return Plateforme;
};
