module.exports = (sequelize, DataTypes) => {
  const Fournisseur = sequelize.define('Fournisseur', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    adresse: {
      type: DataTypes.STRING(60),
    },
  });

  return Fournisseur;
};
