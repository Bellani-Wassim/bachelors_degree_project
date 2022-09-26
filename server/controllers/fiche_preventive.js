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
        id_ticket:req.body.id_ticket,
        id_site:req.body.id_site,
        id_fournisseur:req.body.id_fournisseur,
        id_technicien:req.body.id_technicien,
        periode_ticket:req.body.periode_ticket,
        etat_ticket: req.body.etat_ticket,
        conclusion_general:req.body.conclusion_general,
      });
      
      let dbRes2;
      console.log("before the loop"+JSON.stringify(req.body.equip_ursi));
      req.body.equip_ursi.map(async (item) => {
          dbRes2 = await Equip_URSI.create({
          num_serie:item.num_serie,
          nom_equipement:item.nom_equipement,
          type_model:item.type_model,
          etat:item.etat,
          observation:item.observation,
          FichePreventiveIdTicket:req.body.id_ticket,
        });
      })
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Fiche_preventive.destroy({
        where: {
          id_ticket: req.body.id
        }
      });
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    try {
      const dbRes = await Fiche_preventive.update({
        id_site:req.body.id_site,
        id_fournisseur:req.body.id_fournisseur,
        id_technicien:req.body.id_technicien,
        periode_ticket:req.body.periode_ticket,
        etat_ticket: req.body.etat_ticket,
        conclusion_general:req.body.conclusion_general,
      },{ where: {id_ticket:req.body.id_ticket}});
      
      let dbRes2;
      req.body.equip_ursi.map(async (item) => {
          dbRes2 = await Equip_URSI.update({
          nom_equipement:item.nom_equipement,
          type_model:item.type_model,
          etat:item.etat,
          observation:item.observation,
          FichePreventiveIdTicket:req.body.id_ticket,
        },{ where: {num_serie:item.num_serie}});
      })
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
