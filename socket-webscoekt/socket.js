const Socket = require("net")


class SocketHub {
    server = null;
    message = null;

    run(){
        this.server = Socket.createServer();
        this.message = {}

        // this.server.on("")
    }
}

module.exports.SocketHub = SocketHub