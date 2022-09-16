module.exports = (sequelize, DataTypes) => {
  const Equipement = sequelize.define('Equipement', {
    num_serie: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    FRU: {
      type: DataTypes.STRING,
    },
    nom: {
      type: DataTypes.STRING(60),
    },
    date_mise_en_marche: {
      type: DataTypes.DATEONLY,
    },
    severite: {
      type: DataTypes.STRING(1),
    },
    id_site: {
      type: DataTypes.STRING(5),
    },
    date_fin_service: {
      type: DataTypes.DATEONLY,
    },
  });

  Equipement.associate = (models) => {
    Equipement.belongsTo(models.Plateforme, { foreignKey: 'id_plateforme' });
  };

  return Equipement;
};
