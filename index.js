const app = require('./server');

const port = process.env.PORT || 5000;

const server = require('http').createServer(app);
const io = require('socket.io')(server,{
  cors: {
      origin: "http://localhost:3000",
      credentials: true
  }
});

io.on("connection", (socket) => {
  
  socket.on("fournisseurs_a_changee", () => {
    io.emit("mettre_a_jour_fournisseur");
  });

  socket.on("tickets_a_changee", () => {
    io.emit("mettre_a_jour_tickets");
  });

  socket.on("ticketsC_a_changee", () => {
    io.emit("mettre_a_jour_ticketsC");
  });

  socket.on("techniciens_a_changee", () => {
    io.emit("mettre_a_jour_techniciens");
  });

  socket.on("plateformes_a_changee", () => {
    io.emit("mettre_a_jour_plateformes");
  });

  socket.on("equipements_a_changee", () => {
    io.emit("mettre_a_jour_equipements");
  });

  socket.on("demande_dinscription", () => {
    socket.broadcast.emit("mettre_a_jour_inscription")
  });

  socket.on("demande_approuver", (email) => {
    socket.broadcast.emit("autoriser_lacces", email)
    socket.broadcast.emit("mettre_a_jour_inscription")
    io.emit("mettre_a_jour_employe");
  });

  socket.on("employe_supprimer", (email_socket) => {
    io.emit("interdir_lacces", email_socket)
    socket.broadcast.emit("mettre_a_jour_employe");
  })

  socket.on("demande_dinscription_rejeter", (email_socket) => {
    socket.broadcast.emit("interdir_lacces", email_socket)
    socket.broadcast.emit("mettre_a_jour_inscription");
  })

  socket.on("employe_admin_status_changed", (email_socket, admin) => {
    io.emit("change_admin_status", email_socket, admin);
    io.emit("mettre_a_jour_employe");
  })
  
});



app.startDatabase().then(
  server
  .listen(port, () => {
      console.log(`server up and running on port ${port}`);
  })
);