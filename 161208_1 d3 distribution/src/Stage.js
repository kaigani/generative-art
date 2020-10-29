window.Stage = function Stage(aCanvas){

	const stage = this;

	// PROTECTED
	const canvas = aCanvas;
	const c = canvas.getContext('2d');

	const drawMode = true;

	// PUBLIC
	this.count = 0;
	this.FPS = 0;
	this.variance = 36;


	this.clear = function(){
		
		// Clear the canvas
		c.clearRect(0, 0, canvas.width, canvas.height);
	
	};

	this.plot = function(p){
		
	};

	let origin = [ canvas.width/2, canvas.height/2]

	this.update = function(){

		// CLEAR CANVAS

		if(!drawMode){

			c.clearRect(0, 0, canvas.width, canvas.height);
	
		}
		let edgeLength = (canvas.width > canvas.height) ? canvas.height/2 : canvas.width/2
		

		// DRAW small circles
		for(let i=1000;--i;){

			

			/*
			let point = [
				gaussianRandom()*canvas.height - canvas.height/2,
				gaussianRandom()*canvas.height - canvas.height/2
			]
			*/

			// UNIFORM
			/*
			let point = [
				d3.randomUniform(edgeLength*-1,edgeLength)(),
				d3.randomUniform(edgeLength*-1,edgeLength)()				
			]
			*/
			
			// NORMAL
			
			let point = [
				d3.randomNormal(0,1)()*edgeLength,
				d3.randomNormal(0,1)()*edgeLength				
			]
			
			// WALK
			//origin[0] += point[0]/100
			//origin[1] += point[1]/100
			//if(origin[0] < 0 || origin[0] > canvas.width || origin[1] < 0 || origin[1] > canvas.height) origin = [canvas.width/2,canvas.height/2]
			

			c.fillStyle = 'rgba(0, 0, 0, 0.1)'
			c.beginPath()
			c.arc(origin[0]+point[0],origin[1]+point[1],2,0,2*Math.PI)
			c.fill()
		}
	


	};

	// Helper functions

	// between -1 to 1
	function randomUnit(){
		return Math.random()*2 - 1;
	}

	// between 0 and 2*PI
	function randomAngle(){
		return Math.random()*2*Math.PI;
	}


	// Color functions

	function normalisedHSL(medianH=180){

		const hVal = medianH; // Math.abs(parseInt( (gaussianRandom(0.1)-0.5) * 180 + medianH )%360);
		console.log("FOO",hVal);
		const sVal = 100;
		const lVal = 50;
		const aVal = 1.0; 

		const result = 'hsla('+
			hVal.toString()+
			','+
			sVal.toString()+
			'%,'+
			lVal.toString()+
			'%,'+
			aVal.toString()+
			')';

		return result;
	}

	function gaussianRandom(distribution = 1.0){

		let result;

		do {

			result = generateGaussianNoise(0.5,0.125*distribution)

		} while(result < 0 || result >= 1)

		return result
	}

	function generateGaussianNoise(mu = 0.0,sigma = 1.0){

		//mu = mu || 0.0 
		//sigma = sigma || 1.0
		
		const epsilon = Math.E
		const two_pi = Math.PI * 2

		let z0, u1, u2


		//do {

			u1 = Math.random()
			u2 = Math.random()

		//} while( u1 <= epsilon )

		z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(two_pi * u2)

		return z0 * sigma + mu
	}

	function randomColor(phase){
		return randomColorHSL(phase);
	}

	function randomColorHSL(phase){

		phase = phase || Math.random()*360;
		var hVal, sVal, lVal, result;

		//hVal = parseInt(Math.cos(stage.count/16)*20+phase)%360;
		hVal = parseInt(phase);
		sVal = parseInt(Math.random()*50+30);
		lVal = parseInt(Math.random()*50+30);
		aVal = 1.0; //Math.random();

		result = 'hsla('+
			hVal.toString()+
			','+
			sVal.toString()+
			'%,'+
			lVal.toString()+
			'%,'+
			aVal.toString()+
			')';

		return result;
	}

	function randomColorRange(startColor,endColor,phase){

		var rVal, gVal, bVal, result;
		var greyVal = parseInt((1-phase)*256);
		var greyMix = Math.random()*0.25;
		var colorMix = (1-greyMix)*0.75;
		var aVal = 1.0; //0.16;

		rVal = parseInt( (startColor.r*phase + endColor.r*(1-phase))*colorMix + greyVal*greyMix);
		gVal = parseInt( (startColor.g*phase + endColor.g*(1-phase))*colorMix + greyVal*greyMix);
		bVal = parseInt( (startColor.b*phase + endColor.b*(1-phase))*colorMix + greyVal*greyMix);

		result = 'rgba('+
			rVal.toString()+
			','+
			gVal.toString()+
			','+
			bVal.toString()+
			','+
			aVal.toString()+
			')';

		return result;

	}

	function randomColorRGB(){

		var rVal, gVal, bVal, result;

		rVal = parseInt(Math.random()*256);
		gVal = parseInt(Math.random()*256);
		bVal = parseInt(Math.random()*256);
		aVal = 1.0; //Math.random();

		result = 'rgba('+
			rVal.toString()+
			','+
			gVal.toString()+
			','+
			bVal.toString()+
			','+
			aVal.toString()+
			')';

		return result;

	}

	function randomGrey(){

		var cVal, result;
		cVal = parseInt(Math.random()*255+1);

		result = 'rgb('+
			cVal.toString()+
			','+
			cVal.toString()+
			','+
			cVal.toString()+
			')';

		return result;

	}

	// Event listeners - Window
	//window.addEventListener('click', handleClick, false);
	//window.addEventListener('touchend', handleClick, false);

	// Event handlers
	function handleClick(e) {

		// do something on click or touch
		var x = e.clientX;
		var y = e.clientY;

		//stage.plot({x:x,y:y});
		//stage.update();

		//console.log(e);
		console.log("Clicked at: "+x+","+y);

	}

	
};

Stage.prototype.start = function(){

	var stage = this;

	stage.clear();

	setInterval(()=>{
		//stage.clear();
	}, 32000)

	function loop(){

		stage.count++;

		// Update FPS
		this.timestamp = (this.timestamp)?this.timestamp:Date.now();
		var newTimestamp = Date.now();
		var elapsed_ms = newTimestamp - this.timestamp;
		var FPS = Math.floor( 1000 / elapsed_ms );
		this.timestamp = newTimestamp;

		// debounce - sample FPS every second
		if(stage.count%30 === 0) stage.FPS = FPS;
		

		// UPDATE STAGE
		stage.update();

		// Animation
		requestAnimFrame(loop);
	}

	loop();

	
};

// Utilities

// shim layer with setTimeout fallback - doesn't seem to outperform setInterval though...
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

