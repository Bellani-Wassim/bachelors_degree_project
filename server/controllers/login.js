const { Employe } = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res, next) => {
    try{

    const { email, motDePasse } = req.body;

    if(!email || !motDePasse){
      res.status(401).json( {error: "veuillez remplir tous les champs"} )
      return;
    }

    const employe = await Employe.findOne({ where: { email: email } });

    if (!employe){ 
      res.status(401).json({ error: "email incorrect" });
      return;
    }

    console.log(employe);
    const motDePasseBD = employe.motDePasse;

    bcrypt.compare(motDePasse, motDePasseBD).then((match) => {
      if (!match) {
        res.status(401).json({ error: "mot de passe incorrect" });
      } else {
          res.status(200).json({
            message:"employe authentifier",
            employe: employe
        });
        return;
      }
    });
  } catch (e) {
    res.status(400).json({
      errorMessage: "erreur d'authentification",
      status: false
    });
  }
  },
}