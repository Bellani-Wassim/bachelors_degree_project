const { Fiche_curative } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes2 = await Fiche_curative.findAll();

      res.status(200).json(dbRes2);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Fiche_curative.create({
        id_ticket:req.body.id_ticket,
        id_site:req.body.id_site,
        id_fournisseur:req.body.id_fournisseur,
        id_technicien:req.body.id_technicien,
        periode_ticket:req.body.periode_ticket,
        etat_ticket: req.body.etat_ticket,
        date_signalisation:req.body.date_signalisation,
        heur_signalisation:req.body.heur_signalisation,
        date_reponse:req.body.date_reponse,
        heure_reponse:req.body.heure_reponse,
        severite_equip:req.body.severite_equip,
        temps_restauration:req.body.temps_restauration,
        temps_resolution:req.body.temps_resolution,
        num_serie:req.body.num_serie,
        etat_machine_final:req.body.etat_machine_final,
      });
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Fiche_curative.destroy({
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
      const dbRes = await Fiche_curative.update({
        id_site:req.body.id_site,
        id_fournisseur:req.body.id_fournisseur,
        id_technicien:req.body.id_technicien,
        periode_ticket:req.body.periode_ticket,
        etat_ticket: req.body.etat_ticket,
        date_signalisation:req.body.date_signalisation,
        heur_signalisation:req.body.heure_signalisation,
        date_reponse:req.body.date_reponse,
        heure_reponse:req.body.heure_reponse,
        severite_equip:req.body.severite_equip,
        temps_restauration:req.body.temps_restauration,
        temps_resolution:req.body.temps_resolution,
        num_serie:req.body.num_serie,
        etat_machine_final:req.body.etat_machine_final,
      },{ where: {id_ticket:req.body.id_ticket}});
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
