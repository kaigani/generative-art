window.Stage = function Stage(aCanvas){

	var stage = this;

	// PROTECTED
	var canvas = aCanvas;
	var c = canvas.getContext('2d');

	var yarrowSticks = [];
	var colorPalette = [];

	
	// PUBLIC
	this.count = 0; // counts frames since start
	this.FPS = 0; // observable FPS
	this.lines = [];
	this.msg = "";

	// CONFIGURATION 
	var nSticks = 17; //49;
	var maxRadius = 8;	
	var drawMode = true;
	var paletteSize = 4;

	// create palette
	function resetPalette(){
		for(var i=0; i<paletteSize;i++){
			colorPalette[i]= {
									r: parseInt(Math.random()*5)*63+3,
									g: parseInt(Math.random()*5)*63+3,
									b: parseInt(Math.random()*5)*63+3
								};
		}
		console.log(colorPalette);
	}

	function quantumYarrow(){

		var startColor = colorPalette[parseInt(Math.random()*paletteSize)];

		return ({ 
							x: parseInt(Math.random()*canvas.width), 
							y: parseInt(Math.random()*canvas.height), 
							r: parseInt(Math.random()*maxRadius+8),
							phase: Math.random()*32,
							dx: Math.random()*4-2,
							dy: Math.random()*4-2,
							speed: Math.random()*4-2,
							pairing: parseInt(Math.random()*nSticks),
							//control: parseInt(Math.random()*nSticks),
							control: {
								x: parseInt(Math.random()*17)*canvas.width/16,
								y: parseInt(Math.random()*17)*canvas.height/16,
							},
							startColor: startColor,
							//endColor: startColor
							endColor: colorPalette[parseInt(Math.random()*paletteSize)]
						})
	}

	this.clear = function(){
		
		resetPalette();

		for(var i=0;i<nSticks;i++){
			yarrowSticks[i]=quantumYarrow();
		}

		// Clear the canvas
		c.clearRect(0, 0, canvas.width, canvas.height);

		c.fillStyle = 'rgb(255,255,255)';
		c.fillRect(0,0,canvas.width/2,canvas.height);

		c.fillStyle = 'rgb(0,0,0)';
		c.fillRect(canvas.width/2,0,canvas.width/2,canvas.height);

	
	};

	this.plot = function(p){
		
	};

	var bp0 = { x: parseInt(Math.random()*canvas.width), y: parseInt(Math.random()*canvas.height) };
	var bp1 = { x: parseInt(Math.random()*canvas.width), y: parseInt(Math.random()*canvas.height) };
	var bp2 = { x: parseInt(Math.random()*canvas.width), y: parseInt(Math.random()*canvas.height) };

	this.update = function(){

		// Clear the canvas
		if(!drawMode){

			c.clearRect(0, 0, canvas.width, canvas.height);
	
			c.fillStyle = 'rgb(255,255,255)';
			c.fillRect(0,0,canvas.width/2,canvas.height);
	
			c.fillStyle = 'rgb(0,0,0)';
			c.fillRect(canvas.width/2,0,canvas.width/2,canvas.height);
		}
		
		//c.rotate(Math.PI/1800)

		// DRAW YARROW
		for(var i=0; i<nSticks;i++){
			var p = yarrowSticks[i];
			/*
			p.r -= 0.2;
			if(p.r < 0){
				p = quantumYarrow();
				yarrowSticks[i] = p;
			}
			*/

			// If too close, get a new pairing
			var pair = yarrowSticks[p.pairing];
			if(Math.sqrt(Math.pow(pair.y-p.y,2)+Math.pow(pair.x-p.x,2)) < 2){
				//p.pairing = parseInt(Math.random()*nSticks);
				//p.pairing = pair.pairing;
				p.startColor = pair.startColor;
				//p.endColor = pair.endColor;
				pair.endColor = p.endColor;
			}  

			// Change heading - towards Bezier curve
			pair = yarrowSticks[p.pairing];
			var control = p.control; //yarrowSticks[p.control];
			var time = Math.sin(stage.count/720);
			var bezier = {
				x: Math.pow((1-time),2)*p.x + 2*(1-time)*time*control.x + time*time*pair.x,
				y: Math.pow((1-time),2)*p.y + 2*(1-time)*time*control.y + time*time*pair.y
			}

			var theta = Math.atan2(bezier.y-p.y,bezier.x-p.x);

			p.dx = Math.cos(theta)*0.1+p.dx*0.9; // gradual turn towards the heading
			p.dy = Math.sin(theta)*0.1+p.dy*0.9;


			// move
			p.x += p.dx*p.speed;
			//p.dx = (p.x < 0 || p.x > canvas.width) ? p.dx * -1 : p.dx;
			p.y += p.dy*p.speed;
			//p.dy = (p.y < 0 || p.y > canvas.height) ? p.dy * -1 : p.dy;
			p.speed = (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height ) ? p.speed * -1 : p.speed;

			//var pulseR = p.r + p.r*Math.cos(stage.count/16+p.phase);
			var pulseR = p.r + p.r*Math.cos(p.x/60+p.phase+stage.count/32)*Math.sin(p.y/60+p.phase+stage.count/32);

			if(pulseR < 0.1){ 
				console.log('vanished');
				p.x = Math.random()*canvas.width;
				p.y = Math.random()*canvas.height;
				p.speed *= -1;
				p.pairing = parseInt(Math.random()*nSticks);
			}

			// draw circles
			/*
			for(var j=0; j<8;j++){
				//c.strokeStyle = randomColor(parseInt(Math.cos(pulseR/16)*60+p.phase*8)%360); //randomColor(p.phase*8);
				c.strokeStyle = randomColorRange(p.startColor,p.endColor,Math.cos(pulseR/16));
				c.beginPath();
				c.arc(bezier.x+(Math.random()*4-2),bezier.y+(Math.random()*4-2),pulseR+Math.random()*6,2*Math.PI*Math.random(),2*Math.PI*Math.random());
				c.stroke();

				c.strokeStyle = randomColorRange(p.startColor,p.endColor,Math.cos(pulseR/16));
				c.beginPath();
				c.arc(canvas.width-bezier.x+(Math.random()*4-2),bezier.y+(Math.random()*4-2),pulseR+Math.random()*6,2*Math.PI*Math.random(),2*Math.PI*Math.random());
				c.stroke();
			}
			*/

		
		}


		// RENDER message
		c.font = "15px Arial"; 
		c.textAlign = "left";
		c.fillStyle = "rgb(0,0,0)";
		c.fillText(stage.msg,32,32); 

		// RENDER Hexagram

		// DRAW focal point
		c.fillStyle = randomColorRGB();
		c.fillRect(canvas.width/2-1,canvas.height/2-1,2,2);

		// DRAW CIRCLE
		c.fillStyle = "rgb(255,0,0)";
		var angle = stage.count%360; 
		var angle2 = (stage.count%36)*10;

		var cx = 128*Math.cos(angle*Math.PI/180)+40*Math.sin(angle2*Math.PI/180);
		var cy = 128*Math.sin(angle*Math.PI/180)+40*Math.cos(angle2*Math.PI/180);
		c.fillRect(cx+canvas.width/2,cy+canvas.height/2,2,2);

		// DRAW BEZIER
		c.fillStyle = "rgb(255,0,0)";
		c.fillRect(bp0.x,bp0.y,2,2);
		c.fillRect(bp1.x,bp1.y,2,2);
		c.fillRect(bp2.x,bp2.y,2,2);

		c.fillStyle = "rgb(0,0,255)";
		var t = (stage.count%360)/360;
		var bP = {
			x: Math.pow((1-t),2)*bp0.x + 2*(1-t)*t*bp1.x + t*t*bp2.x,
			y: Math.pow((1-t),2)*bp0.y + 2*(1-t)*t*bp1.y + t*t*bp2.y,
		}
		c.fillRect(bP.x,bP.y,2,2);

		if(stage.count%360 === 0){
			bp0 = bp2;
			bp1 = { x: parseInt(Math.random()*canvas.width), y: parseInt(Math.random()*canvas.height) };
			bp2 = { x: parseInt(Math.random()*canvas.width), y: parseInt(Math.random()*canvas.height) };
		}
		
	};

	// Color functions

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
		aVal = 0.16; //Math.random();

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
	window.addEventListener('click', handleClick, false);
	window.addEventListener('touchend', handleClick, false);

	// Event handlers
	function handleClick(e) {

		// do something on click or touch
		var x = e.clientX;
		var y = e.clientY;

		//stage.plot({x:x,y:y});
		//stage.update();

		//console.log(e);
		console.log("Clicked at: "+x+","+y);

		// Only advance if Yang is clicked
		if(x < canvas.width/2){
		
				// total the yarrows
				var yinTotal = 0;
				var yangTotal = 0;
	
				for(var i=0;i<nSticks;i++){
	
					if(yarrowSticks[i].x < canvas.width/2){
						yangTotal++;
					}else{
						yinTotal++;
					}
				}
	
				yangTotal > yinTotal ? doYang() : doYin();
		}

		stage.clear();

		if(stage.lines.length === 6){
			console.log('HEXAGRAM FOUND:');
			for(var i=1;i<=64;i++){
				
				if(_.isEqual(ICHING.hexagram[i].lines, stage.lines)){
					console.log(ICHING.hexagram[i].reading);
					stage.msg = i.toString()+'. '+ICHING.hexagram[i].reading;
				}
			}
			stage.lines.length = 0;
		}

	}

	function doYang(){
		stage.lines.push(ICHING.YANG);
		console.log('YANG');
	}

	function doYin(){
		stage.lines.push(ICHING.YIN);
		console.log('YIN');
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

