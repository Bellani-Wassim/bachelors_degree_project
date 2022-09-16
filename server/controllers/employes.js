const { Employe } = require('../models');

module.exports = {
  get: async (req, res, next) => {
    try {
      const dbRes = await Employe.findAll();

      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  approve: async (req, res, next) => {
    try {
      const email = req.body.email;
      
      const dbRes = await Employe.update(
        { isApproved: true },
        { where: { email: email } }
        )
        res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res) => {
    try {
      const email = req.body.email;

      const dbRes = await Employe.destroy({
        where: {
          email: email
        }
    });
    res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  employeStatus: async (req, res) => {
    try {
      const email = req.body.email;
      const admin = req.body.admin;
      const dbRes = await Employe.update(
        { admin: !admin },
        { where: { email: email } }
        );
      res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  }
};
