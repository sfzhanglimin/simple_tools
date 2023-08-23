const WebSocket = require("ws")
const Socket = require("net")
const Express = require("express")
const BodyParser = require('body-parser');

const SocketHub = require("./socket").SocketHub

class WebServer {
    wsClient = null;
    message = null;


    socketClient = {};

    run() {
        const localIP = this.getLocalIP() ?? "127.0.0.1";
        const server = new WebSocket.Server({ port: 8088, host: localIP })
        server.on("connection", (wsClient) => {
            console.log('Client connected');
            wsClient.on('message', (message) => {
                const str = message.toString();
                let obj = null
                try {
                    obj = JSON.parse(str);
                }
                catch (E) {
                    console.error(E)
                    return;
                }

                if (obj.action) {
                    switch (obj.action) {
                        case "connect": {
                            const address = obj.data.address;
                            const port = obj.data.port;
                            if (this.socketClient[wsClient]) {
                                this.socketClient[wsClient].client.end();
                                this.socketClient[wsClient] = null;
                            }

                            let clientSocket = null;
                            clientSocket = Socket.connect({ port: port, host: address }, (aSuccess) => {
                                console.log("连接外网socket成功")

                                wsClient.send(JSON.stringify({ action: "connect" }), (data) => {

                                    console.log("发送socket 成功数据")
                                })
                            })

                            this.socketClient[wsClient] = { client: clientSocket, buffer: null };

                            clientSocket.on("data", data => {
                                if (!this.socketClient[wsClient]) {
                                    clientSocket.end()
                                    return;
                                }

                                let clientBuffer = this.socketClient[wsClient].buffer

                                if (clientBuffer) {
                                    const buffer2 = new Uint8Array(data.buffer);
                                    const buffer3 = new Uint8Array(clientBuffer.length + buffer2.length);
                                    buffer3.set(clientBuffer)
                                    buffer3.set(buffer2, clientBuffer.length)
                                    clientBuffer = buffer3;
                                }
                                else {
                                    clientBuffer = new Uint8Array(data.buffer)
                                }

                                while (clientBuffer.length > 8) {
                                    let dataView = new DataView(clientBuffer.buffer);
                                    const len = dataView.getUint32(0, true) + 4;
                                    const serverID = dataView.getUint32(4, true);

                                    if (serverID !== 0xFFFFFFFF) {
                                        const orLen = clientBuffer.length;
                                        if (orLen >= len) {
                                            const sendData = Buffer.from(clientBuffer.slice(0, len));
                                            clientBuffer = clientBuffer.slice(len);
                                            this.socketClient[wsClient].buffer = clientBuffer
                                            wsClient.send(JSON.stringify({ action: "data", data: sendData }))
                                            console.log(`<<<<<<<<<<<<<<<<<socket接到服务器数据 time:${Date.now()} 原始${orLen} 需要:${len}`)
                                        }
                                        else {
                                            //console.log(`<<<<<<<<<<<<<<<<<<服务器消息长度不够 需要:${len} 当前:${clientBuffer.length}`)
                                            this.socketClient[wsClient].buffer = clientBuffer
                                            break;
                                        }
                                    }
                                    else {
                                        //console.log(`<<<<<<<<<<<<<<<<<<获取到的serialid不对.抛弃数据:${serverID}`)
                                        clientBuffer = clientBuffer.slice(len);
                                        this.socketClient[wsClient].buffer = clientBuffer;
                                    }
                                }
                            })
                        }
                            break;
                        case "send": {
                            if (obj.data && this.socketClient[wsClient]) {
                                const list = []
                                for (let i = 0; i < obj.dataLen; ++i) {
                                    list[i] = obj.data[i];
                                }
                                let arrayBuffer = new ArrayBuffer(list.length)
                                let dataView = new DataView(arrayBuffer);
                                const data = new Uint8Array(arrayBuffer);
                                data.set(list)

                                const len = dataView.getUint32(0, true) + 4;
                                const serverID = dataView.getUint32(4, true);
                                const par = { list: data, offset: 8, len: data.length }
                                const serialid = this.readVi(par)
                                const typeID = this.readVi(par)

                                console.log(`>>>>>>>>>>>>>>>>>发送数据到服务器 time:${Date.now()} serviceID:${serverID} serialid:${serialid} typeid:${typeID}`)
                                this.socketClient[wsClient].client.write(data);
                            }
                        }
                            break;
                    }
                }

            });
            wsClient.on('close', () => {
                if(this.socketClient[wsClient]){
                    this.socketClient[wsClient].client.end();
                }
                this.socketClient[wsClient] = null;
                console.log(`on socket close`);
            });
        })


        console.log(`开始监听${localIP}:8088`)


        // this.client = new Socket.connect()
    }


    getLocalIP() {
        const os = require('os');
        const osType = os.type(); //系统类型
        const ifaces = os.networkInterfaces(); //网络信息
        let locatIp = '';
        for (let dev in ifaces) {
            //console.log(dev)   //打印看结果
            if (dev === '本地连接' || dev === 'WLAN' || dev === "以太网") {
                for (let j = 0; j < ifaces[dev].length; j++) {
                    if (ifaces[dev][j].family === 'IPv4') {
                        locatIp = ifaces[dev][j].address;
                        break;
                    }
                }
            }
        }
        // console.log(osType)
        // console.log(locatIp)  //IP地址
        return locatIp;
    }

    readVi(aData) {
        let v = 0x0;
        let ua = aData.list;
        let offset = aData.offset;
        let len = aData.len
        for (let shift = 0; shift < 64; shift += 7) {
            if (offset === len) {
                throw new Error("Rvu out of range")
            };
            let b = ua[offset++];
            v |= (b & 0x7F) << shift;
            if ((b & 0x80) == 0) break;
        }
        aData.offset = offset
        return ((v >>> 1) ^ -(v & 1)) | 0
    }

    doConnect(address, port) {
        if (this.socketClient) {
            this.socketClient.end();
        }

        this.socketClient = Socket.connect({ port: port, host: address }, () => {

        })

        this.socketClient.on("data", aData => {
            this.wsClient.send(aData);
        })
    }
}


new WebServer().run();

module.exports.WebServer = WebServer