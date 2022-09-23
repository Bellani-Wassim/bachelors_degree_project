module.exports = (sequelize, DataTypes) => {
  const Fiche_curative = sequelize.define('Fiche_curative', {
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
    date_signalisation: {
      type: DataTypes.STRING(20),
    },
    heur_signalisation: {
      type: DataTypes.STRING(20),
    },
    date_reponse: {
      type: DataTypes.STRING(20),
    },
    heure_reponse: {
      type: DataTypes.STRING(20),
    },
    severite_equip: {
      type: DataTypes.STRING(1),
    },
    temps_restauration: {
      type: DataTypes.STRING(20),
    },
    temps_resolution: {
      type: DataTypes.STRING(20),
    },
    num_serie: {
      type: DataTypes.STRING(10),
    },
    etat_machine_final: {
      type: DataTypes.STRING(20),
    },
  });

  return Fiche_curative;
};
