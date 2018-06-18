var CarSprite=cc.Sprite.extend({
    ctor:function () {
        this._super();
        this.uuid=UUID.create();
    },
    bindDriver:function(player){
        this.driver=player;
    },
    bindShooter:function(player){
        this.shoot=player;
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
    //HP
    health:100,
    //C4
    c4:false,
    //C4数量
    c4_num:5,
    //埋放的C4 id
    c4_id:null,
    //地雷
    mine:false,
    //地雷数量
    mine_num:5,
    //地雷列表
    mine_id_list:[],
    //火箭
    rocket:false,
    //是否死亡(重新开始时置为true)
    dead:true,
    update:function () {
        if (this.dead) {
            this.unscheduleUpdate();
            return;
        }

    },
    respawn:function () {
      this.dead=false;
      this.scheduleUpdate();
    },
    resetCarStatus:function () {

    }
});