

const hft = require('happyfuntimes');

const GameServer = new hft.GameServer();

var players=[];


//
//var Player = function(netPlayer, name) {
//    this.netPlayer = netPlayer;
//    this.name = name;
//
//    netPlayer.addEventListener('disconnect', Player.prototype.disconnect.bind(this));
//    netPlayer.addEventListener('move', Player.prototype.movePlayer.bind(this));
//
//    this.playerNameManager = new PlayerNameManager(netPlayer);
//    this.playerNameManager.on('setName', Player.prototype.handleNameMsg.bind(this));
//};
//
//// The player disconnected.
//Player.prototype.disconnect = function() {
//    for (var ii = 0; ii < players.length; ++ii) {
//        var player = players[ii];
//        if (player === this) {
//            players.splice(ii, 1);
//            return;
//        }
//    }
//};
//
//Player.prototype.movePlayer = function(cmd) {
//    console.log(JSON.stringify(cmd));
//
//};
//
//Player.prototype.handleNameMsg = function(name) {
//    this.name = name;
//};



cc.game.onStart = function(){
    var sys = cc.sys;
    if(!sys.isNative && document.getElementById("cocosLoading")) //If referenced loading.js, please remove it
        document.body.removeChild(document.getElementById("cocosLoading"));

    // Pass true to enable retina display, on Android disabled by default to improve performance
    cc.view.enableRetina(sys.os === sys.OS_IOS ? true : false);

    // Disable auto full screen on baidu and wechat, you might also want to eliminate sys.BROWSER_TYPE_MOBILE_QQ
    if (sys.isMobile && 
        sys.browserType !== sys.BROWSER_TYPE_BAIDU &&
        sys.browserType !== sys.BROWSER_TYPE_WECHAT) {
        cc.view.enableAutoFullScreen(true);
    }

    // Adjust viewport meta
    cc.view.adjustViewPort(true);

    // Uncomment the following line to set a fixed orientation for your game
    cc.view.setOrientation(cc.ORIENTATION_LANDSCAPE);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize( 960,640, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
};

var BattlegroundScene=cc.Scene.extend({

});

class Player{
    constructor(newPlayer){
        this.netPlayer=newPlayer;
        //hft 断线事件
        this.netPlayer.on("disconnect",this.handlerDisconnect.bind(this));
        //测试操作
        this.netPlayer.on("move",this.handleMoveCmd.bind(this));
        //hft 默认事件
        this.netPlayer.on("setname",this.handleSetName.bind(this));
        //功能键1 按下或者放手
        this.netPlayer.on("action1_op",this.action1.bind(this));
        //功能键2 按下或者放手
        this.netPlayer.on("action2_op",this.action2.bind(this));

        /**
         * 玩家类型
         *  0->新玩家,1->驾驶员,2->枪炮手
         * @type {number}
         */
        this.type=0;
    }
    handleSetName(cmd){

    };
    handlerDisconnect(){
        var index=players.indexOf(this);
        if (index>=0){
            players.splice(index,1);
        }
    };
    handleMoveCmd(cmd){
        console.log(JSON.stringify(cmd));
    };
    action1(cmd){
        console.log("a "+cmd.operation);
    };
    action2(cmd){
        console.log("b "+cmd.operation);
    };
}

function createPlayer(netPlayer,name){
    players.push(new Player(netPlayer,name));
}

GameServer.on('playerconnect',createPlayer);

cc.game.run();





