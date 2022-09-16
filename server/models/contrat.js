module.exports = (sequelize, DataTypes) => {
  const Contrat = sequelize.define('Contrat', {
    reference: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    date_debut: {
      type: DataTypes.DATEONLY,
    },
    date_fin: {
      type: DataTypes.DATEONLY,
    },
  });

  Contrat.associate = (models) => {
    Contrat.belongsTo(models.Plateforme, { foreignKey: 'id_plateforme' });
    Contrat.belongsTo(models.Fournisseur, { foreignKey: 'id_fournisseur' });
  };

  return Contrat;
};
