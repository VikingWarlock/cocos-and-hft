var CarSprite=cc.Sprite.extend({
    ctor:function () {
        this._super();
        this.uuid=UUID.create();
    },
    bindDriver:function(player){

    },
    bindShooter:function(player){

    },
    //移动速度
    speed_x:0,
    speed_y:0,
    //射击方向
    shoot_x:0,
    shoot_y:0,
    //是否射击
    shoot:false,
    //当前位置
    current_x:0,
    current_y:0,
    //地雷
    mine:false,
    //火箭
    rocket:false,
    //是否死亡(重新开始时置为true)
    dead:true,
});