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
};
