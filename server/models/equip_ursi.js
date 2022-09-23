module.exports = (sequelize, DataTypes) => {
  const Equip_URSI = sequelize.define('Equip_URSI', {
    num_serie: {
      type: DataTypes.STRING(15),
      primaryKey: true,
    },
    nom_equipement: {
      type: DataTypes.STRING(25),
    },
    type_model: {
      type: DataTypes.STRING(25),
    },
    etat: {
      type: DataTypes.STRING(20),
    },
    observation: {
      type: DataTypes.STRING(40),
    },
  }, 
  {
    timestamps: false,
  });
  Equip_URSI.associate = (models) => {
    models.Equip_URSI.belongsTo(models.Fiche_preventive, {
      foreignKey: "num_ticket",
      constraints: false,
      as: "equip_ursi",
    });  
  }
  return Equip_URSI;
};
