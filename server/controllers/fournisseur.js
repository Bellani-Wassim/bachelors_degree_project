const { Fournisseur } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Fournisseur.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Fournisseur.create(req.body);

      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Fournisseur.destroy({
        where: {
          id: req.body.id
        }
      });
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  put: async (req, res, next) => {
    try {
      const dbRes = await Fournisseur.update(
        { nom : req.body.nom, 
          email : req.body.email,
          adresse : req.body.adresse },
        { where: { id: req.body.id } }
        );
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
