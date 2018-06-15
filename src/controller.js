"use strict";

requirejs(['./node_modules/happyfuntimes/dist/hft.js', './node_modules/hft-sample-ui/dist/sample-ui.js']
    , function (hft, sampleUI) {
        const GameClient = hft.GameClient;
        var Input = sampleUI.input;

        const g_client = new GameClient();
        var inputElem = document.getElementById("inputarea");

        g_client.on("connect",function(){
           console.log("connected");
        });

// Send a message to the game when the screen is touched
        inputElem.addEventListener('pointerdown', function (event) {
            var position = Input.getRelativeCoordinates(event.target, event);
            sendMoveCmd(position, event.target);
            event.preventDefault();
        });


        var sendMoveCmd = function (position, target) {
            g_client.sendCmd('move', {
                x: position.x / target.clientWidth,
                y: position.y / target.clientHeight,
            });
        };

    });

