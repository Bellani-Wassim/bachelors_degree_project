const { Technicien } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Technicien.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  post: async (req, res, next) => {
    try {
      const dbRes = await Technicien.create(req.body);

      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const dbRes = await Technicien.destroy({
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
      const dbRes = await Technicien.update(
        { nom : req.body.nom, 
          prenom : req.body.prenom, 
          email : req.body.email,
          telephone : req.body.telephone,
          id_fournisseur : req.body.id_fournisseur, 
          adresse : req.body.adresse },
        { where: { id: req.body.id } }
        );
      res.status(201).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
};
