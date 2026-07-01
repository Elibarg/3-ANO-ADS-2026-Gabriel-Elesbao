function configurarSocket(io) {

    io.on("connection", (socket) => {

        console.log(`Usuário conectado: ${socket.id}`);

        socket.on("mensagem", (mensagem) => {

            io.emit("mensagem", mensagem);

        });

        socket.on("disconnect", () => {

            console.log(`Usuário saiu: ${socket.id}`);

        });

    });

}

module.exports = configurarSocket;