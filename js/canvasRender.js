let canvas = new fabric.Canvas('canvas');
let circle, origX, origY;
let canvasX = 1000, canvasY = 600;
let bestWeight = 999999.0;
let bestPath = [];

let allPoints = [];


// Temp array of best paths and their weights. Use to train Machine
let trainingCache = [];

// Define the ML objects
var Neuron = synaptic.Neuron,
	Layer = synaptic.Layer,
	Network = synaptic.Network,
	Trainer = synaptic.Trainer,
	Architect = synaptic.Architect;

// Define the parameters of the Perceptron
function Perceptron(input, hidden, output)
{
	// create the layers
	var inputLayer = new Layer(input);
	var hiddenLayer = new Layer(hidden);
	var outputLayer = new Layer(output);

	// connect the layers
	inputLayer.project(hiddenLayer);
	hiddenLayer.project(outputLayer);

	// set the layers
	this.set({
		input: inputLayer,
		hidden: [hiddenLayer],
		output: outputLayer
	});
}
// extend the prototype chain
Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

// Trainer needs to be defined for easy input
var myNetwork = new Architect.Perceptron(2, 2, 1)
var trainer = new Trainer(myNetwork);
var trainingSet = [];




function initCanvas() {
  canvas = new fabric.Canvas(
    'canvas', {
    selection: false
    });
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function clearCanvas() {
  allPoints = [];
  bestWeight = 999999.0;
  bestPath = [];
  canvas.clear();
}

function draw8Points() {
  for (let i = 0; i < 8; i++) {
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
  for (let i = 0; i < 20; i++) {
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
 return result;
}

function currentPermatationWeight(currentPermatation) {
  let tempDistance = 0.0;
  // Find the distance of the current Permutation
  for (let i = 0; i < allPoints.length - 1; i++) {
    // Distance formula adds to temp distance
    tempDistance += Math.sqrt(((currentPermatation[i][0] - currentPermatation[i+1][0]) * (currentPermatation[i][0] - currentPermatation[i+1][0])) + ((currentPermatation[i][1] - currentPermatation[i+1][1]) * (currentPermatation[i][1] - currentPermatation[i+1][1])))
  }
  // Add distance from the last to the first element
  tempDistance += Math.sqrt(((currentPermatation[currentPermatation.length - 1][0] - currentPermatation[0][0]) * (currentPermatation[currentPermatation.length - 1][0] - currentPermatation[0][0])) + ((currentPermatation[currentPermatation.length - 1][1] - currentPermatation[0][1]) * (currentPermatation[currentPermatation.length - 1][1] - currentPermatation[0][1])))
  return tempDistance;
}

function bruteForce() {
  let allPermutations = permutator(allPoints);

  for (let i = 0; i < allPermutations.length; i++) {
    let tempWeight = currentPermatationWeight(allPermutations[i]);
    if(tempWeight < bestWeight){
      bestWeight = tempWeight;
      bestPath = allPermutations[i];
    }

  }
  console.log(bestWeight);
  console.log(bestPath);
  bestPath.push(bestPath[0])

  trainingCache.push([bestPath, bestWeight]);

  // Draw the Best Path
  for (let i = 0; i < bestPath.length - 1; i++) {
    canvas.add(new fabric.Line([bestPath[i][0], bestPath[i][1], bestPath[i+1][0], bestPath[i+1][1]], {
        stroke: 'red'
    }));
  }
}

function trainMachine(){
  // put all point inputs and outputs into training object
  for (let i = 0; i < trainingCache.length; i++) {
    let tempInput = trainingCache[i][0];
    let tempOutput = trainingCache[i][1];
    trainingSet.push(
      {input: { tempInput }, output: { tempOutput }}
    );
  }
  // Perform training
  trainer.train(trainingSet);
}

function useMachine(){
  console.log(myNetwork.activate(allPoints));
}




$(document).ready(function() {
  initCanvas();

  canvas.on('mouse:down', function(o){
    console.log(allPoints);
    let pointer = canvas.getPointer(o.e);
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
