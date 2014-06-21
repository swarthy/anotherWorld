var socket = require('./client/socket');

$(function () {
    socket.connect();

    var pixi = require('pixi');

    // You can use either WebGLRenderer or CanvasRenderer
    var renderer = pixi.autoDetectRenderer(800, 600);
    document.body.appendChild(renderer.view);

    var stage = new pixi.Stage();

    var graphics = new pixi.Graphics();

    graphics.beginFill(0xFF3300);
	graphics.lineStyle(10, 0xffd900, 1);
	
	// draw a shape
	graphics.moveTo(50,50);
	graphics.lineTo(250, 50);
	graphics.lineTo(100, 100);
	graphics.lineTo(250, 220);
	graphics.lineTo(50, 220);
	graphics.lineTo(50, 50);
	graphics.endFill();

    // add it the stage so we see it on our screens..
    stage.addChild(graphics);

    window.window.requestAnimationFrame(animate);

    function animate() {


        // render the stage

        // do a test..

        renderer.render(stage);
        window.window.requestAnimationFrame(animate);
    }
});