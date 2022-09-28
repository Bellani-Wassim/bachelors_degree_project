module.exports = (sequelize, DataTypes) => {
  const Contrat = sequelize.define('Contrat', {
    id_contrat: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    id_platform: {
      type: DataTypes.STRING(20),
    },
    id_fournisseur: {
      type: DataTypes.STRING(20),
    },
    num_serie: {
      type: DataTypes.STRING(20),
    },
    date_debut: {
      type: DataTypes.STRING(20),
    },
    date_fin: {
      type: DataTypes.STRING(20),
    },
  });

  Contrat.associate = (models) => {
    Contrat.belongsTo(models.Plateforme, { foreignKey: 'id_plateforme' });
    Contrat.belongsTo(models.Fournisseur, { foreignKey: 'id_fournisseur' });
  };

  return Contrat;
};
