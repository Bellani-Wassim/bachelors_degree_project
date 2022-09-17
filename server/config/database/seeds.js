module.exports = ({
  Fournisseur, IGE, Plateforme, Site, Panne, Contrat, Equipement, Technicien, Ticket, Employe,
}) => () => Promise.all([
  Fournisseur.create({
    id: '123',
    nom: 'test fournisseur',
    email: 'fournisseur@email.com',
    adresse: 'chez le fournisseur',
  }),
  IGE.create({
    id: '123456789ABCDEF',
    nom: "nom de l'IGE",
    prenom: "prenom de l'IGE",
    telephone: '0550505050',
  }),
  Plateforme.create({
    id: '12345',
    nom: 'nom de plateforme',
  }),
  Site.create({
    id: '12345',
    nom: 'nom du site',
  }),
  Employe.create({
    id_user: '0000',
    nom: 'Aliane',
    prenom: 'Yamina',
    email: 'yamina.aliane@algerietelecom.dz', 
    motDePasse: '$2b$10$y/CGD5mNjpDN.PG9RxnM0u2kL62cezwgl9OLGRTaBdscOZtFEnF0G',
    admin: true,
    isApproved: true,
  }),
  Panne.create({
    id: '123456789A',
    message_erreur: 'ceci est un message erreur',
    type: 'le type de la panne',
    nom_logiciel: 'un logiciel',
  }),
])
  .then(([fournisseur, ige, plateforme, site, panne]) => Promise.all([
    Contrat.create({
      reference: '123456789A',
      id_fournisseur: fournisseur.id,
      id_plateforme: plateforme.id,
    }),
    Equipement.create({
      num_serie: '123456789ABCDEF',
      FRU: 'FRU-test',
      nom: "nom de l'equipement",
      severite: '2',
      id_plateforme: plateforme.id,
      id_site: site.id,
      date_mise_en_marche : "2021-11-24", 
    date_fin_service : "2022-8-10",
    }),
    Technicien.create({
      id: '123',
      nom: 'tech',
      prenom: 'bon',
      telephone: '0660606060',
      email: 'technicien@email.com',
      adresse: 'ain beniane rue al djahid',
      id_fournisseur: fournisseur.id,
    }),
  ]).then((proRet) => [fournisseur, ige, plateforme, ...proRet]))
  .then(([fournisseur, ige, plateforme, equipement, technicien]) => Ticket.create({
    numero: '123456789A',

    heure_signalisation: 15,
    heure_reponse: 16,
    resultat_interviention: "ceci est un resultat d'intervention",
    observation: 'ceci est une observation faite par le technicien',
    observation_IGE: "ceci est une observation faite par l'IGE",
    id_plateforme: plateforme.id,
    id_IGE: ige.id,
    id_technicien: technicien.id,
    id_fournisseur: fournisseur.id,
    num_serie_equipement: equipement.num_serie,
  }));
