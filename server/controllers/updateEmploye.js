const { Employe } = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
  updateName: async (req, res, next) => {
    try {
      const nom = req.body.nom;
      const email = req.body.email;
      
      const dbRes = await Employe.update(
        { nom: nom },
        { where: { email: email } }
        )
        res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  updateSurname: async (req, res, next) => {
    try {
      const prenom = req.body.prenom;
      const email = req.body.email;
      
      const dbRes = await Employe.update(
        { prenom: prenom },
        { where: { email: email } }
        )
        res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  updateEmail: async (req, res, next) => {
    try {
      const nom = req.body.nom;
      const prenom = req.body.prenom;
      const email = req.body.email;
      
      const dbRes = await Employe.update(
        { email: email },
        { where: { prenom: prenom , nom: nom } }
        )
        res.status(200).json(dbRes);
    } catch (error) {
      next(error);
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { email, motDePasse, nouveauMotDePasse } = req.body;

      const employe = await Employe.findOne({ where: { email: email } });

      if (!employe){ 
        res.status(401).json({ error: "email incorrect" });
        return;
      }

      const motDePasseBD = employe.motDePasse;

      bcrypt.compare(motDePasse, motDePasseBD).then((match) => {
        if (!match) {
          res.status(401).json({ error: "mot de passe incorrect" });
        } else {
          bcrypt.hash(nouveauMotDePasse, 10).then((hash) => {
            Employe.update(
              { motDePasse: hash },
              { where: { email: email } }
              ).then(
                res.status(200).json({message:"mot de passe chager"})
              ).catch((err) => {
                res.status(400).json({ error: err });
              });
              
              return;
          });
        }
        }); 

        } catch (error) {
        console.log("une erreur est survenue");
        res.status(400).json({ error: error });
      }
  },
};
