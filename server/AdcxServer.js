/**
 * 服务端
 */

var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

// 消息号
var Msg = {
    REQ_LOGIN : 1001, // 登陆
    REQ_JOINHOUSE: 1002, // 进入房间
    REQ_BATTLE: 1003, // 进入战斗

    RES_LOGIN: 2001, // 接收登陆数据
}

//玩家Id
var playerId = 0;
//房间Id
var houseId = 1;

//玩家类型
var playerType = {
    self: 1, //自己
    enemy: 2 //敌人
};

//状态
var playerState = {
    normal: 0, // 普通
    luck: 1 // 幸运儿
};

//玩家列表
var players = {}

//房间列表
var house = {};

//等待列表
var waitPlayers = [];

//房间最大人数
var houseMaxNum = 2;

//房间内玩家出生位置
var playerPos = [
    {x: -532, y: 258},
    {x: 532, y: 258},
    {x: -532, y: -258},
    {x: 532, y: -258},
];


//用户连接
io.on("connection",
    function (socket) {

        var emitData = function (id, content) {
            socket.emit("message" , JSON.stringify({id, content}));
        };

        var emitDataBySocket = function (id, content, curSocket) {
            curSocket.emit("message" , JSON.stringify({id, content}));
        };

        var player = {
            playerId,
            dir: 0,
            pos: {},
            playerType: playerType.self,
            time: 90,
            state: playerState.normal
        };
        players[playerId] = player;
        socket.playerId = playerId;
        
        playerId++;

        emitData(Msg.RES_LOGIN, {player: player});

        //断开连接
        socket.on("disconnect", function () {

            if (socket.houseId) {
                console.log("用户断线:"+socket.playerId);
                socket.broadcast.in(socket.houseId).emit("exit", { playerId: socket.playerId });

                socket.leave(socket.houseId);

                var ahouse = house[socket.houseId];
                for(var i = 0; i < ahouse.players.length; i++){
                    if(ahouse.players[i].playerId == socket.playerId){
                        ahouse.players.splice(i, 1);
                        break;
                    }
                }

                if (ahouse.players.length == 0) {
                    console.log("deleteHouse " + socket.houseId);
                    delete house[socket.houseId];
                }

            }
            for(var i = 0; i < waitPlayers.length; i++){
                if(waitPlayers[i].playerId == socket.playerId){
                    waitPlayers.splice(i, 1);
                    break;
                }
            }

            delete players[socket.playerId];
        });

        //进入房间
        socket.on(Msg.REQ_JOINHOUSE, function (data) {

            console.log(Msg.REQ_JOINHOUSE);
            data = JSON.parse(data);

            //加入等待列表
            for(var j = 0; j < waitPlayers.length; j++){
                if(waitPlayers[j].playerId == socket.playerId){
                    return;
                }
            }

            waitPlayers.push(socket);

            var player = players[socket.playerId];


            if(waitPlayers.length>=houseMaxNum){

                var housePlayers = waitPlayers.splice(0, houseMaxNum);
                house[houseId] = { players: [] };

                var posIndex = 0;

                for(var i=0; i<houseMaxNum; i++) {
                    var player = players[housePlayers[i].playerId];
                    player.pos = playerPos[posIndex];
                    posIndex++;

                    housePlayers[i].houseId = houseId;
                    housePlayers[i].join(houseId);
                    // 组队成功
                    console.log(Msg.REQ_JOINHOUSE);
                    emitDataBySocket(Msg.REQ_JOINHOUSE, {result: true}, housePlayers[i]);
                }
                house[houseId].players = housePlayers;
                houseId++;
            }
        });

        // 进入战斗
        socket.on(Msg.REQ_BATTLE, function () {
            var data = {};
            var curPlayer = players[socket.playerId];

            for(var i = 0; i< house[socket.houseId].players.length; i++){
                var playerId = house[socket.houseId].players[i].playerId;
                var player = players[playerId];

                if(player.playerId == curPlayer.playerId){
                    player.playerType = playerType.self;
                }else{
                    player.playerType = playerType.enemy;
                }

                data[playerId] = player;
            }
            emitData(Msg.REQ_BATTLE, {players: data});

        });
        

    
    }
);

server.listen(5555, function () {
    console.log("listening on 5555");
});