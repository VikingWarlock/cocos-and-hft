"use strict";




requirejs(['./node_modules/happyfuntimes/dist/hft.js']
    , function (hft, sampleUI) {
        const GameClient = hft.GameClient;

        const g_client = new GameClient();
        var move_element = document.getElementById("movingArea");
        var action_a_element=document.getElementById("action-button-a");
        var action_b_element=document.getElementById("action-button-b");

        var move_pad_base=document.getElementById("moving_bar_init");
        var move_pad_body=document.getElementById("moving_bar_current");

        var init_x;
        var init_y;

        var last_x_axis;
        var last_y_axis;

        var first_touch_id;


        g_client.on("connect",function(){
           console.log("connected");
        });

// Send a message to the game when the screen is touched

        move_element.addEventListener('touchstart', function (event) {
            first_touch_id=event.targetTouches.item(0).identifier;
            init_x=event.targetTouches.item(0).clientX;
            init_y=event.targetTouches.item(0).clientY;
            show_moving_pad_base(init_x,init_y);
            event.preventDefault();
        });

        move_element.addEventListener("touchmove",function (event) {
            var touches=event.targetTouches;
            var touch=null;
            var i=0;
            for (i=0;i<touches.length;i++){
                if (touches.item(i).identifier===first_touch_id){
                    touch=touches.item(i);
                    move_pad(touch.clientX,touch.clientY);
                    sendMoveCmd(touch.clientX-init_x, touch.clientY-init_y);
                    break;
                }
            }
            event.preventDefault();
        });

        move_element.addEventListener("touchend",function (event) {
            init_x=null;
            init_y=null;
            first_touch_id=null;
            last_x_axis=null;
            last_y_axis=null;
            move_end();
            sendMoveCmd(0,0);
            event.preventDefault();
        });
        move_element.addEventListener("touchcancel",function (event) {
            init_x=null;
            init_y=null;
            last_x_axis=null;
            last_y_axis=null;
            first_touch_id=null;
            sendMoveCmd(0,0);
            event.preventDefault();
        });

        //按键手势
        action_a_element.addEventListener("touchstart",function (event) {
            sendAction1Down(1);
            event.preventDefault();
        });

        action_b_element.addEventListener("touchstart",function (event) {
            sendAction2Down(1);
           event.preventDefault();
        });

        action_a_element.addEventListener("touchend",function (event) {
            sendAction1Down(0);
            event.preventDefault();
        });

        action_b_element.addEventListener("touchend",function (event) {
            sendAction2Down(0);
            event.preventDefault();
        })

        //configure moving pad

        var show_moving_pad_base=function (asix_x,asix_y) {
            move_pad_base.style.visibility="visible";
            move_pad_body.style.visibility="visible";
            move_pad_body.style.left=asix_x-(move_pad_body.style.width/2)+"px";
            move_pad_body.style.top=asix_y-(move_pad_body.style.height/2)+"px";
            move_pad_base.style.left=asix_x-(move_pad_base.style.width/2)+"px";
            move_pad_base.style.top=asix_y-(move_pad_base.style.height/2)+"px";
        };

        var move_pad=function (asix_x,asix_y) {
            move_pad_body.style.left=asix_x-(move_pad_body.style.width/2)+"px";
            move_pad_body.style.top=asix_y-(move_pad_body.style.height/2)+"px";
        };

        var move_end=function () {
            move_pad_base.style.visibility='hidden';
            move_pad_body.style.visibility='hidden';
        };

        //sending part
        var sendMoveCmd = function (axis_x, axis_y) {

            if (last_x_axis==null||last_y_axis==null){
                last_x_axis=Math.round(axis_x/5);
                last_y_axis=Math.round(axis_y/5);
                if (last_x_axis>15){
                    last_x_axis=15;
                }
                if (last_y_axis>15){
                    last_y_axis=15;
                }
            }else {
                var new_x_axis=Math.round(axis_x/5);
                var new_y_axis=Math.round(axis_y/5);
                if (new_x_axis>15){
                    new_x_axis=15;
                }
                if (new_y_axis>15){
                    new_y_axis=15;
                }
                if (new_x_axis===last_x_axis&&new_y_axis===last_y_axis){
                    return;
                } else {
                    last_y_axis=new_y_axis;
                    last_x_axis=new_x_axis;
                }
            }

            g_client.sendCmd('move', {
                x: last_x_axis,
                y: last_y_axis,
            });
        };

        var sendAction1Down=function (event) {
            g_client.sendCmd("action1_op",{
                operation:event,
            });
        }

        var sendAction2Down=function (event) {
            g_client.sendCmd("action2_op",{
                operation:event,
            });
        }


    });

