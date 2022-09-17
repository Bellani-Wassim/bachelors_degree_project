module.exports = (sequelize, DataTypes) => {
  const Employe = sequelize.define('Employe', {
    id_user: {
      type: DataTypes.STRING(4),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(10),
    },
    prenom: {
      type: DataTypes.STRING(20),
    },
    email: {
      type: DataTypes.STRING(25),
    },
    motDePasse: {
      type: DataTypes.STRING(20),
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Employe;
};
