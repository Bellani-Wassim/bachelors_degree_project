module.exports = (sequelize, DataTypes) => {
  const Employe = sequelize.define('Employe', {
    nom: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    prenom: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(25),
      primaryKey: true,
    },
    motDePasse: {
      type: DataTypes.STRING(20),
      primaryKey: true,
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
