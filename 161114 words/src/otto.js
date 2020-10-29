//
// OTTO - the jibber jabber
//

(function(){

	var root = this;
	var brain = {};

	var OTTO = function(){

		this.value = 'bar';
	};

	// TEACH OTTO words 
	// store in 3-letter blocks so they are more sensible

	function teachWord(word){

		word += '$'.repeat(3-word.length%3);
		var prevPart = '^';

		for(var i=0;i<word.length;i+=3){
			var part = word.substr(i,3);

			/*
			ch = (i>0 && ch === word[i-1]) ? ch+'2' : ch;
			var nextch = (i+1 < word.length) ? word[i+1] : '$';
			nextch = (nextch !== ch) ? nextch : nextch+'2';


			brain[ch] = brain[ch] || { total: 0, children: {} };
			brain[ch].children[nextch] = brain[ch].children[nextch] || 0;
			brain[ch].children[nextch]++;
			brain[ch].total++;
			*/

			brain[prevPart] = brain[prevPart] || { total: 0, children: {} };
			brain[prevPart].children[part] = brain[prevPart].children[part] || 0;
			brain[prevPart].children[part]++;
			brain[prevPart].total++;

			prevPart = part;
		}
		//console.log(brain);
	}

	function getWord(){

		var result = '^';
		var lastpart = '^';
		var maxWordLength = 10;

		for(var i=0; result[result.length-1] !== '$'; i++){

			//var lastch = result[result.length-1];
			//lastch = (lastch === '2') ? result[result.length-2]+'2' : lastch;

			//console.log(result);
			var charDist = brain[lastpart].children;

			if(i < maxWordLength || charDist.hasOwnProperty('$') === false){

				var pick = Math.random()*brain[lastpart].total;

				for(key in charDist){
					if(pick < charDist[key]){
						result += key;
						lastpart = key;
						break;
					}
					pick -= charDist[key];
				}
				//result += brain[lastch][parseInt(Math.random()*brain[lastch].length)];
			}else{
				result += '$';
			}
		}

		return result.replace(/\^|2|\$/g,'');
	}

	// Should really use syllable probabilities & frequency analysis here to generate a word
	function randomSyllable(){

		var result = "";

		var cons = "b,c,d,f,g,h,j,k,l,m,n,p,qu,r,s,t,v,w,x,y,z,ch,sh,wh,bl,br,sl,st,sn,str,ng".split(',');
		var vow = "a,e,i,o,u,ar,ow,ou,ee,ea".split(',');

		var firstVowel = Math.random() < 0.5;

		if(!firstVowel){
			result += cons[ Math.floor( Math.random() * cons.length ) ];
		}
		result += vow[ Math.floor( Math.random() * vow.length ) ];
		result += cons[ Math.floor( Math.random() * cons.length ) ];

		return result;
	}

	function randomWord(){

		var result = "";

			for(var i=0; i<Math.floor(Math.random()*3)+1; i++){
				// add 1-3 syllables - but make it less probable as we add more
				if(i*0.4 < Math.random() ){
					result += randomSyllable();
					console.log('i:'+i+', '+result);
				}
			}
		return result;
	}

	OTTO.prototype.randomWord = randomWord;
	OTTO.prototype.teachWord = teachWord;
	OTTO.prototype.getWord = getWord;

/*
 * Finish module 
 */

	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = OTTO;
		}
		exports.OTTO = OTTO;
	} else {
		root.OTTO = OTTO;
	}

	root.OTTO = OTTO;

}).call(this);