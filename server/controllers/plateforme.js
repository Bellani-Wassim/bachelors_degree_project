const { Plateforme } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Plateforme.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Plateforme.create(req.body);

      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Plateforme.destroy({
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
      const dbRes = await Plateforme.update(
        { nom : req.body.nom },
        { where: { id: req.body.id } }
        );
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
