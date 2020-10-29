window.Stage = function Stage(aCanvas){

	const stage = this;

	// PROTECTED
	const canvas = aCanvas;
	const c = canvas.getContext('2d');

	const drawMode = true;
	const sqlen =10;

	let grid = [];
	let seed = parseInt(Math.random()*360);

	// PUBLIC
	this.count = 0;
	this.FPS = 0;
	this.variance = 90;
	this.seeds = 8;
	this.greyscale = false;
	this.freeze = false;
	this.filledCells = 0;

	// Protected functions
	// Pick a random offset from the current and fill with the current value
	function randomPlot(row,col){

		if(grid[row][col] === -1) return;

		let value = grid[row][col];
		let rows = grid.length;
		let cols = grid[0].length;

		rowOffset = (Math.random()*3|0)-1;
		colOffset = (Math.random()*3|0)-1;

		row += rowOffset;
		col += colOffset;

		// wrap around the seam for a continuous spread
		row = (row < 0) ? rows+row : row;
		row = (row >= rows) ? row-rows : row;
		col = (col < 0) ? cols+col : col;
		col = (col >= cols) ? col-cols : col;	
		
		//let seed = ((gaussianRandom(stage.variance/360)-0.5)*180 + value)%360;
		// don't wrap around
		let seed = (gaussianRandom(stage.variance/360)-0.5)*180 + value;
		seed = (seed < 0) ? Math.abs(seed) : seed;
		seed = (seed > 360) ? 720-seed : seed;

		// average 
		//value = (grid[row][col] !== -1) ? (grid[row][col]+seed)/2 : seed;

		// weighted average
		value = (grid[row][col] !== -1) ? grid[row][col]*0.9 +seed*0.1  : seed;

		// maintain existing
		//value = (grid[row][col] !== -1) ? grid[row][col] : seed;
		
		if(grid[row][col] === -1) stage.filledCells++;
		grid[row][col] = value;

	}

	this.clear = function(){
		
		// Clear the canvas
		c.clearRect(0, 0, canvas.width, canvas.height);

		// Reset variables
		stage.count = 0;
		stage.freeze = false;
		stage.filledCells = 0;

		// Initialise grid – 2D array
		let cols = parseInt(canvas.width/sqlen);
		let rows = parseInt(canvas.height/sqlen);
		grid = [];

		console.log("Rows, cols:",rows,cols);

		let i,j;

		for(i=0; i<rows; i++){
			grid[i] = [];
			for(j=0; j<cols; j++){
				grid[i][j] = -1;
			}
		}

		// Plant seeds
		for(let k=stage.seeds;k--;){
			i = Math.random()*rows|0;
			j = Math.random()*cols|0;
			grid[i][j] = Math.random()*360;
			stage.filledCells++;
			randomPlot(i,j);
		}

		// Initial generation
		for(let k=10000;--k;){
			i = Math.random()*rows|0;
			j = Math.random()*cols|0;
			randomPlot(i,j);
		}
		
		

		

	};

	this.plot = function(p){
		
	};


	this.update = function(){

		let rows = grid.length;
		let cols = grid[0].length;

		// Clear if animated
		//c.clearRect(0, 0, canvas.width, canvas.height);

		if(stage.filledCells === rows*cols){
			stage.freeze = true;
		}

		//if(stage.freeze) return;

		// DRAW GRID

		if(!stage.freeze){
			for(let k=10000;--k;){
				i = Math.random()*rows|0;
				j = Math.random()*cols|0;
				randomPlot(i,j);
			}
		}

		for(let i=0; i<rows; i++){
			for(let j=0; j<cols; j++){
				
				seed = grid[i][j];
			
				//blur – average by adjacent values
				let avgCount = 1
				if(i>0 && grid[i-1][j] !== -1){
					seed += grid[i-1][j];
					avgCount++
				}
				if(i<rows-1 && grid[i+1][j] !== -1){
					seed += grid[i+1][j];
					avgCount++
				}
				if(j>0 && grid[i][j-1] !== -1){
					seed += grid[i][j-1];
					avgCount++
				}
				if(j<cols-1 && grid[i][j+1] !== -1){
					seed += grid[i][j+1];
					avgCount++
				}
				seed /= avgCount;
				
				

				c.fillStyle = (seed !== -1) ? normalisedHSL(seed,stage.greyscale) : 'grey';
				c.fillRect(j*sqlen,i*sqlen,sqlen,sqlen);

				// change children
				//if(i+1<rows){
				//	grid[i+1][j] = ((gaussianRandom(stage.variance/360)-0.5)*180 + seed)%360;
				//}

				//if(j+1<cols){
				//	grid[i][j+1] = ((gaussianRandom(stage.variance/360)-0.5)*180 + seed)%360;
				//}
				//seed = ((gaussianRandom(stage.variance/360)-0.5)*180 + seed)%360;
			}
		}

/*
		let seed = parseInt(Math.random()*360);
		console.log("Starting with seed: ",seed)

		for(var i=0;i<canvas.width; i++){
	
				c.strokeStyle = normalisedHSL(seed);
				c.beginPath();
				c.moveTo(i,0);
				c.lineTo(i,canvas.height);
				c.stroke();

				//seed = generateGaussianNoise(seed,2.0)%360;
				seed = ((gaussianRandom(stage.variance/360)-0.5)*180 + seed)%360;

			}
*/		
		
	};

	// Color functions

	function normalisedHSL(medianH=180, greyscale=false){

		const hVal = parseInt(medianH); // Math.abs(parseInt( (gaussianRandom(0.1)-0.5) * 180 + medianH )%360);
		//console.log("HUE",hVal);
		const sVal = (greyscale) ? 0 : 100;
		//const lVal = (hVal < 90) ? 0: 100; // B&W
		let lVal = (hVal < 180) ? 50 : hVal*50/360+50|0; // make snowy
		lVal = (greyscale) ? hVal*100/360|0 : lVal; // 50;
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

