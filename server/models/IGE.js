module.exports = (sequelize, DataTypes) => {
  const IGE = sequelize.define('IGE', {
    id: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(30),
    },
    prenom: {
      type: DataTypes.STRING(30),
    },
    telephone: {
      type: DataTypes.STRING(10),
    },
  });

  return IGE;
};
