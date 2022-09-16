const { Employe } = require('../models');
const bcrypt = require("bcrypt");

module.exports = {
  register: 
     async (req, res) => {
    const { nom, prenom, email ,motDePasse, confirmationMDP, admin, isApproved} = req.body;
    if(!nom || !prenom || !email || !motDePasse || !confirmationMDP){
      res.status(400).json( {error: "veuillez remplir tous les champs"} )
      return;
    }

    const employe = await Employe.findOne({ where: { email: email } });
    if(employe){
      res.status(400).json({error: "cette employé a deja été enregistré"})
      return;
    }

    if(motDePasse!==confirmationMDP){
      res.status(400).json({ error: "les mots de passes ne sont pas identiques" });
      return;
    }

    bcrypt.hash(motDePasse, 10).then((hash) => {
      Employe.create({
        nom: nom,
        prenom: prenom,
        email: email,
        motDePasse: hash,
        admin: admin,
        isApproved: isApproved
      })
        .then(() => 
          res.status(200).json("l'employe a bien etait inscrit")
          )
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    });
    }
}