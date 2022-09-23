const { Fiche_preventive , Equip_URSI } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes2 = await Fiche_preventive.findAll({ include: ["equip_ursi"] });

      res.status(200).json(dbRes2);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Fiche_preventive.create({
        id_ticket:"0",
        id_site:"a",
        id_fournisseur:"a",
        id_technicien:"a",
        periode_ticket:"a",
        etat_ticket: true,
        conclusion_general:"a",
      });

      const dbRes2 = await Equip_URSI.create({
        num_serie:"a",
        nom_equipement:"a",
        type_model:"a",
        etat:"a",
        observation:"a",
        FichePreventiveIdTicket:"0",
      });

      res.status(201).json(dbRes2);
    } catch (error) {
      next(error);
    }
  },
};
