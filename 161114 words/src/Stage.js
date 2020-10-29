window.Stage = function Stage(aCanvas,aDict){

	var stage = this;

	// PROTECTED
	var canvas = aCanvas;
	var dict = aDict;
	var c = canvas.getContext('2d');

	var yarrowSticks = [];
	var colorPalette = [];

	
	// PUBLIC
	this.count = 0; // counts frames since start
	this.FPS = 0; // observable FPS

	this.otto = new OTTO();
	this.TTS = new TextToSpeech();


	// setup otto's brain
	function teachOTTO(){
		var dictData = dict.getData();
		console.log(dict.hasLoaded)
		for(var i=0;i<dictData.length;i++){
			stage.otto.teachWord(dictData[i]);
			console.log('Taught OTTO a word');
		}
	}
	if(dict.hasLoaded){
		teachOTTO();
	}else{
		dict.onload = teachOTTO;
	}

	// CONFIGURATION 
	drawMode = true;

	this.clear = function(){

		c.clearRect(0, 0, canvas.width, canvas.height);

		if(Math.cos(stage.count) < 0){
			c.fillStyle = 'rgb(0,0,0)';
			c.fillRect(0,0,canvas.width,canvas.height);
		}
	
	};

	this.plot = function(word){
		
		// RENDER message
		var fontSize = parseInt(Math.random()*64)+8;
		c.font = fontSize+"px Arial"; 
		c.textAlign = "center";
		c.fillStyle = randomColorRGB();
		c.fillText(word,Math.random()*canvas.width,Math.random()*canvas.height); 
	};

	this.update = function(){

		// Clear the canvas
		if(!drawMode){

			c.clearRect(0, 0, canvas.width, canvas.height);
	
			c.fillStyle = 'rgb(255,255,255)';
			c.fillRect(0,0,canvas.width/2,canvas.height);
	
			c.fillStyle = 'rgb(0,0,0)';
			c.fillRect(canvas.width/2,0,canvas.width/2,canvas.height);
		}
		
		
			

		// draw random triangles
		/*
		var p1 = {
			x : p.x + Math.random()*pulseR-pulseR/2,
			y : p.y + Math.random()*pulseR-pulseR/2,
		}
		c.strokeStyle = randomGrey();
		c.beginPath();
		c.moveTo(p1.x,p1.y);
		c.lineTo(p.x + Math.random()*pulseR-pulseR/2, p.y + Math.random()*pulseR-pulseR/2);
		c.lineTo(p.x + Math.random()*pulseR-pulseR/2, p.y + Math.random()*pulseR-pulseR/2);
		c.lineTo(p1.x,p1.y);
		c.stroke();
		*/
		if(stage.count %64 === 0){
			//console.log('Word lookup');
			dict.getRandomWord(stage.plot);
		}

		if(stage.count %491 === 0){
			
			var word = stage.otto.getWord();
			console.log('OTTO Word – ',word);

			if(Math.random() < 0.3) stage.TTS.speakText(word);

			if(word.length > 2) stage.plot(stage.otto.getWord());
		}
		//stage.plot(otto.randomWord());

		// RENDER Hexagram

		// DRAW focal point
		c.fillStyle = randomColorRGB();
		c.fillRect(canvas.width/2-1,canvas.height/2-1,2,2);
		
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

		stage.clear();

	}

	
};

Stage.prototype.start = function(){

	var stage = this;

	//stage.clear();

	function clearInterval(){
		stage.clear();
		setTimeout(clearInterval,parseInt(Math.random()*5+1)*60*1000);
	}
	clearInterval();

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

