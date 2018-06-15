const GameClient = hft.GameClient;
const g_client = new GameClient();
var inputElem = document.getElementById("inputarea");


// Send a message to the game when the screen is touched
inputElem.addEventListener('pointerdown', function (event) {
    var position = Input.getRelativeCoordinates(event.target, event);
    sendMoveCmd(position, event.target);
    event.preventDefault();
});


var sendMoveCmd = function (position, target) {
    client.sendCmd('move', {
        x: position.x / target.clientWidth,
        y: position.y / target.clientHeight,
    });
};
