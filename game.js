

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
    cc.view.setOrientation(cc.ORIENTATION_PORTRAIT);

    // Setup the resolution policy and design resolution size
    cc.view.setDesignResolutionSize( 640,960, cc.ResolutionPolicy.SHOW_ALL);

    // The game will be resized when browser size change
    cc.view.resizeWithBrowserSize(true);

    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new HelloWorldScene());
    }, this);
};


class Player{
    constructor(newPlayer){
        this.netPlayer=newPlayer;
        this.netPlayer.on("disconnect",this.handlerDisconnect.bind(this));
        this.netPlayer.on("move",this.handlerMoveCmd.bind(this));
        this.netPlayer.on("setname",this.handleSetName.bind(this));
    }
    handleSetName(cmd){

    };
    handlerDisconnect(){
        var index=players.indexOf(this);
        if (index>=0){
            players.splice(index,1);
        }
    };
    handlerMoveCmd(cmd){
        console.log(JSON.stringify(cmd));
    };
}

function createPlayer(netPlayer,name){
    players.push(new Player(netPlayer,name));
}

GameServer.on('playerconnect',createPlayer);

cc.game.run();





