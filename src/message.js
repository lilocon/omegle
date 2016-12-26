/**
 * socket io
 */


var storage = require('./storage');
var cookie = require('cookie');
// var cookieParser = require('cookie-parser');
var uid = require('uid-safe').sync;

// 等待配对的客户端
var waitClient;

// 所有活动的客户端
var clients = {};

module.exports = function (io) {

    io.on('connection', function (socket) {
        console.log(waitClient);

        // var cookies = cookieParser.JSONCookies(cookie.parse(socket.request.headers.cookie));
        // var clientId = cookies.client_id;

        var clientId = uid(30);
        var toId;

        if (clientId == undefined) {
            socket.emit('err', 'clientId获取失败');
            io.close();
            return;
        }

        if (clients[clientId] != undefined) {
            socket.emit('err', '不能打开多个窗口');
            return;
        } else {
            clients[clientId] = socket;
        }

        socket.on('disconnect', function () {
            delete clients[clientId];

            if (waitClient == clientId) {
                waitClient = null;
            }

            if (clients[toId]) {
                clients[toId].send({type: "sys", msg: "对方已断开"});
            }

            console.log('拜拜');
        });

        // 配对成功
        socket.pairing = function (id) {
            toId = id;
            console.log("配对成功");
            console.log("我的id" + clientId);
            console.log("对方id" + toId);
            socket.send({type: "sys", msg: "配对成功, 跟对方打个招呼吧~"});
        };

        // 接收消息
        socket.on('message', function (msg) {
            if (toId && clients[toId]) {
                socket.send({type: "self", msg: msg});
                clients[toId].send({type: "other", msg: msg});
            } else {
                socket.send({type: "sys", msg: "发送失败"});
            }
        });

        socket.send({type: "sys", msg: "正在配对中, 请稍后"});

        // 配对
        if (!waitClient) {
            waitClient = clientId;
        } else if(waitClient != clientId) {
            toId = waitClient;
            waitClient = null;
            clients[toId].pairing(clientId);
            socket.send({type: "sys", msg: "配对成功, 跟对方打个招呼吧~"});
        }
        // console.log(clients);
    });

};