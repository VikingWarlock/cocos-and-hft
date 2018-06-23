var BattleSpriteLayer=cc.Layer.extend({
    sprite:null,
    car_list:[],
    ctor:function () {
        this._super();
        var size=cc.winSize;
    },
    start_running:function (player_list) {
        this.players=player_list;
        cc.Director.scheduleUpdate(this,cc.Scheduler.PRIORITY_SYSTEM,false);
    },
    update:function () {
        for(var i=0;i<this.car_list.length;i++){
            var car=this.car_list.indexOf(i);

        }
    },

});
