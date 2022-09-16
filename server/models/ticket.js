module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('Ticket', {
    numero: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    date_signalisation: {
      type: DataTypes.DATEONLY,
    },
    heure_signalisation: {
      type: DataTypes.INTEGER,
    },
    date_reponse: {
      type: DataTypes.DATEONLY,
    },
    heure_reponse: {
      type: DataTypes.INTEGER,
    },
    resultat_interviention: {
      type: DataTypes.TEXT,
    },
    observation: {
      type: DataTypes.TEXT,
    },
    observation_IGE: {
      type: DataTypes.TEXT,
    },
  });

  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Fournisseur, { foreignKey: 'id_fournisseur' });
    Ticket.belongsTo(models.Technicien, { foreignKey: 'id_technicien' });
    Ticket.belongsTo(models.Equipement, { foreignKey: 'num_serie_equipement' });
    Ticket.belongsTo(models.Plateforme, { foreignKey: 'id_plateforme' });
    Ticket.belongsTo(models.IGE, { foreignKey: 'id_IGE' });
  };

  return Ticket;
};
