module.exports = (sequelize, DataTypes) => {
  const Fiche_preventive = sequelize.define('Fiche_preventive', {
    id_ticket: {
      type: DataTypes.STRING(4),
      primaryKey: true,
    },
    id_site: {
      type: DataTypes.STRING(5),
    },
    id_fournisseur: {
      type: DataTypes.STRING(3),
    },
    id_technicien: {
      type: DataTypes.STRING(3),
    },
    periode_ticket: {
      type: DataTypes.STRING(20),
    },
    etat_ticket: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    conclusion_general: {
      type: DataTypes.STRING(20),
      defaultValue: false,
    },
  }, 
  {
    timestamps: false,
  });
  Fiche_preventive.associate = (models) => {
    Fiche_preventive.hasMany(models.Equip_URSI, { as: "equip_ursi"});
  }
  return Fiche_preventive;
};
