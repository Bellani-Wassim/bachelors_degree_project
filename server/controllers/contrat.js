const { Contrat } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Contrat.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Contrat.create(req.body);

      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Contrat.destroy({
        where: {
          id_contrat: req.body.id
        }
      });
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const dbRes = await Contrat.update(
        { id_platform : req.body.id_platform, 
          id_fournisseur : req.body.id_fournisseur,
          num_serie : req.body.num_serie,
          date_fin: req.body.date_fin,
          date_debut: req.body.date_debut },
        { where: { id_contrat: req.body.id } }
        );
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};