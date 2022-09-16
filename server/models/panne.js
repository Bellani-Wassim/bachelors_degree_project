module.exports = (sequelize, DataTypes) => {
  const Panne = sequelize.define('Panne', {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    message_erreur: {
      type: DataTypes.STRING(30),
    },
    type: {
      type: DataTypes.STRING,
    },
    nom_logiciel: {
      type: DataTypes.STRING,
    },
  });

  return Panne;
};
