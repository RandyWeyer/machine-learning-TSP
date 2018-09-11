let canvas = new fabric.Canvas('canvas');
let circle, origX, origY;
let canvasX = 1000, canvasY = 600;

let allPoints = [];

function initCanvas() {
  canvas = new fabric.Canvas(
    'canvas', {
    // isDrawingMode: true
    selection: false
    });
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function draw50Points() {
  for (var i = 0; i < 50; i++) {
        console.log(allPoints);
    origX = getRandomInt(canvasX);
    origY = getRandomInt(canvasY);
    circle = new fabric.Circle({
      left: origX,
      top: origY,
      radius: 3,
      strokeWidth: 1,
      stroke: 'black',
      fill: 'white',
      selectable: false,
      originX: 'center', originY: 'center'
    });
    allPoints.push([origX, origY]);
    canvas.add(circle);
  };
      canvas.renderAll();
}
function draw100Points() {
  for (var i = 0; i < 100; i++) {
        console.log(allPoints);
    origX = getRandomInt(canvasX);
    origY = getRandomInt(canvasY);
    circle = new fabric.Circle({
      left: origX,
      top: origY,
      radius: 3,
      strokeWidth: 1,
      stroke: 'black',
      fill: 'white',
      selectable: false,
      originX: 'center', originY: 'center'
    });
    allPoints.push([origX, origY]);
    canvas.add(circle);
  };
      canvas.renderAll();
}

function travellingSalesman() {

}




$(document).ready(function() {
  initCanvas();

  canvas.on('mouse:down', function(o){
    console.log(allPoints);
    var pointer = canvas.getPointer(o.e);
    origX = pointer.x;
    origY = pointer.y;
    circle = new fabric.Circle({
      left: pointer.x,
      top: pointer.y,
      radius: 3,
      strokeWidth: 1,
      stroke: 'black',
      fill: 'white',
      selectable: false,
      originX: 'center', originY: 'center'
    });
    allPoints.push([origX, origY]);
    canvas.renderAll();
    canvas.add(circle);
  });


});
