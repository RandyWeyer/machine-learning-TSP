let canvas = new fabric.Canvas('canvas');
let circle, origX, origY;
let canvasX = 1000, canvasY = 600;
var bestWeight = 999999.0;
var bestPath = [];

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

function draw8Points() {
  for (var i = 0; i < 8; i++) {
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
function draw20Points() {
  for (var i = 0; i < 20; i++) {
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

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)
console.log(result);
 return result;
}

function currentPermatationWeight(currentPermatation) {
  var tempDistance = 0.0;
  // Find the distance of the current Permutation
  for (var i = 0; i < allPoints.length - 1; i++) {
    // console.log(allPoints[i][0]);
    // Distance formula adds to temp distance
    tempDistance += Math.sqrt(((currentPermatation[i][0] - currentPermatation[i+1][0]) * (currentPermatation[i][0] - currentPermatation[i+1][0])) + ((currentPermatation[i][1] - currentPermatation[i+1][1]) * (currentPermatation[i][1] - currentPermatation[i+1][1])))
  }
  // Add distance from the last to the first element
  // console.log(currentPermatation.length);
  tempDistance += Math.sqrt(((currentPermatation[currentPermatation.length - 1][0] - currentPermatation[0][0]) * (currentPermatation[currentPermatation.length - 1][0] - currentPermatation[0][0])) + ((currentPermatation[currentPermatation.length - 1][1] - currentPermatation[0][1]) * (currentPermatation[currentPermatation.length - 1][1] - currentPermatation[0][1])))
  // console.log(tempDistance);
  return tempDistance;
}

function bruteForce() {
  var allPermutations = permutator(allPoints);

  for (var i = 0; i < allPermutations.length; i++) {
    // console.log(allPermutations[i]);
    var tempWeight = currentPermatationWeight(allPermutations[i]);
    if(tempWeight < bestWeight){
      console.log(tempWeight);
      bestWeight = tempWeight;
      bestPath = allPermutations[i];
    }

  }
  console.log(bestWeight);
  console.log(bestPath);
  bestPath.push(bestPath[0])

  // Draw the Best Path
  for (var i = 0; i < bestPath.length - 1; i++) {
    canvas.add(new fabric.Line([bestPath[i][0], bestPath[i][1], bestPath[i+1][0], bestPath[i+1][1]], {
        stroke: 'red'
    }));
    console.log(bestPath[i]);
  }
  // canvas.add(new fabric.Line([bestPath[this.length][0], bestPath[this.length][1], bestPath[0][0], bestPath[0][1]], {
  //     stroke: 'red'
  // }));
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
