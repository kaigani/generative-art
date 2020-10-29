window.Stage = function Stage(aCanvas){

	const stage = this;

	// PROTECTED
	const canvas = aCanvas;
	const c = canvas.getContext('2d');

	const drawMode = true;

	// PUBLIC
	this.count = 0;
	this.FPS = 0;
	this.colors = 1;
	this.palette = []


	this.clear = function(){
		
		console.log('\n\n- - - - - - - - - - - \n\n')

		// Reset the stage counter
		stage.count = 0

		// Clear the canvas
		c.clearRect(0, 0, canvas.width, canvas.height);

		console.log('Generating palette')
		this.palette = generatePalette(this.colors)
		console.log(this.palette)

	}


	this.update = function(){

		// CLEAR CANVAS

		if(!drawMode){

			c.clearRect(0, 0, canvas.width, canvas.height);
	
		}
		

		// DRAW LINES

		if(stage.count % 400 === 1){

			c.clearRect(0, 0, canvas.width, canvas.height)

			let stripWidth = canvas.width/this.palette.length
			for(let i=0; i<this.palette.length;i++){
				c.fillStyle = colorToHSL(this.palette[i])
				c.fillRect(i*stripWidth,0,stripWidth+2,canvas.height) // +2 to remove odd seams
			}
		}
		
	};

	// Color functions

	function generatePalette(nColors=1,palette=[],depth=0){

		nColors = nColors > 0 ? nColors : 1

		if(depth===0){
			console.log('generatePalette: Returning seed at depth 0')
			let palette = [{
				h: Math.random()*360|0,
				s: Math.random()*100|0,
				l: Math.random()*100|0
			}]
			return(generatePalette(nColors,palette,depth+1))
			
		}else if(depth===nColors){
			console.log('generatePalette: Returing palette at max depth')
			return palette
		}

		let seed = palette[0]
		//console.log('Generate color for',seed,'at',depth)

		let h = seed.h
		let s = seed.s
		let l = seed.l

		for(let i=0; i<depth;i++){

			let hAdj = 360 / Math.pow(2,i+2)
			let sAdj = 100 / Math.pow(2,i+2)
			let lAdj = 100 / Math.pow(2,i+2)

			hAdj = ( Math.random()<0.5 ) ? -1 * hAdj : hAdj
			sAdj = ( Math.random()<0.5 ) ? -1 * sAdj : sAdj
			lAdj = ( Math.random()<0.5 ) ? -1 * lAdj : lAdj

			h += hAdj
			h = ( h<360 ) ? h : h%360
			h = ( h>0 ) ? h : 360+h

			s += sAdj
			s = ( s<100 ) ? s : s%100
			s = ( s>0 ) ? s : 100+s

			l += lAdj
			l = ( l<100 ) ? l : l%100
			l = ( l>0 ) ? l : 100+l
		}
		//console.log('\tAdjust by',hAdj,sAdj,lAdj)
		console.log('\tResult',h,s,l)

		palette.push({h:h,s:s,l:l})

		return(generatePalette(nColors,palette,depth+1))
	}

	function colorToHSL(o){

		const hVal = o.h
		const sVal = o.s
		const lVal = o.l
		const aVal = 1.0 

		const result = 'hsla('+
			hVal.toString()+
			','+
			sVal.toString()+
			'%,'+
			lVal.toString()+
			'%,'+
			aVal.toString()+
			')'

		return result
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


	function loop(){

		stage.count++;

		if(stage.count%240 === 0){
			stage.colors++
			stage.colors = (stage.colors > 16) ? 1 : stage.colors
			stage.clear()
		}

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

