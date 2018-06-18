// 战斗场景
var BattlegroundScene = cc.Scene.extend({
    ctor: function () {
        cc.Node.prototype.ctor.call(this);
        this._ignoreAnchorPointForPosition=true;
        this.setContentSize(cc.director.getWinSize());
    },
    onEnter:function () {
        this._super();
        var backgroundLayer=new BattlegroundLayer();
        this.addLayer(backgroundLayer);
        this.spriteLayer=new BattleSpriteLayer();
        this.addLayer(this.spriteLayer);
    },
    onEnterTransitionDidFinish:function () {
        this._super();
    },
    onExit:function () {
        this._super();
    },
    players:null,
});


