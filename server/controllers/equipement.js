const { Equipement } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Equipement.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Equipement.create(req.body);

      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Equipement.destroy({
        where: {
          num_serie: req.body.id
        }
      });
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const dbRes = await Equipement.update(
        { FRU : req.body.FRU, 
          nom : req.body.nom, 
          id_plateforme : req.body.id_plateforme,
          severite : req.body.severite, 
          id_site: req.body.id_site,
          date_mise_en_marche : req.body.date_mise_en_marche, 
          date_fin_service : req.body.date_fin_service},
        { where: { num_serie: req.body.num_serie } }
        );
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
