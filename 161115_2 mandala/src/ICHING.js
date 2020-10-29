
// Returns a hexagram as a series of HTML divs
function renderHexagram(hexagram){

	hexHTML = "";

	for(var i=0;i<hexagram.lines.length;i++){

		if(hexagram.lines[i] === ICHING.YANG){
			hexHTML = renderYang()+hexHTML;
		}else{
			hexHTML = renderYin()+hexHTML;
		}
	}

	return hexHTML;
}

function renderYang(){
	return "<div class='yang'></div>";
}

function renderYin(){
	return "<div class='yin-1'></div><div class='yin-2'></div>";
}

function randomHexagram(){

	return ICHING.hexagram[ Math.floor( Math.random() *64) + 1];
}

function getTrigrams(hexagram){

	var trigrams = { upper: '', lower: '' };

	var lowerLines = [ hexagram.lines[0], hexagram.lines[1], hexagram.lines[2] ];
	var upperLines = [ hexagram.lines[3], hexagram.lines[4], hexagram.lines[5] ];

	trigrams.upper = getTrigramName(upperLines);
	trigrams.lower = getTrigramName(lowerLines);

	return trigrams;
}

function getTrigramName(trigram){

	// Could do this in binary, but it doesn't seem right 

	// first YANG
	if(trigram[0] === ICHING.YANG){ 

		// second YANG
		if(trigram[1] === ICHING.YANG){

			// third YANG
			if(trigram[2] === ICHING.YANG){

				return('HEAVEN');

			// third YIN	
			}else{

				return('LAKE');
			}

		// second YIN
		}else{

			// third YANG
			if(trigram[2] === ICHING.YANG){

				return('FIRE');

			// third YIN	
			}else{

				return('THUNDER');
			}
		}

	// first YIN
	}else{

		// second YANG
		if(trigram[1] === ICHING.YANG){

			// third YANG
			if(trigram[2] === ICHING.YANG){

				return('WIND');

			// third YIN	
			}else{

				return('WATER');
			}

		// second YIN
		}else{

			// third YANG
			if(trigram[2] === ICHING.YANG){

				return('MOUNTAIN');

			// third YIN	
			}else{

				return('EARTH');
			}
		}
	}
}

// ICHING MODEL

(function(window){

	window.ICHING = {
		YANG : function(){ return true; },
		YIN : function(){ return false; }
	};

	var YANG = window.ICHING.YANG;
	var YIN = window.ICHING.YIN;

	window.ICHING.hexagram = {

		1 : {

			reading : 'HEAVEN',
			lines : [YANG,YANG,YANG,YANG,YANG,YANG]

		},

		3 : {

			reading : 'DIFFICULTY',
			lines : [YANG,YIN,YIN,YIN,YANG,YIN]
		},

		5 : {

			reading : 'WAITING',
			lines : [YANG,YANG,YANG,YIN,YANG,YIN]
		},

		7 : {

			reading : 'THE ARMY',
			lines : [YIN,YANG,YIN,YIN,YIN,YIN]
		},

		9 : {

			reading : 'NURTURANCE BY THE SMALL',
			lines : [YANG,YANG,YANG,YIN,YANG,YANG]
		},

		11 : {

			reading : 'TRANQUILITY',
			lines : [YANG,YANG,YANG,YIN,YIN,YIN]
		},

		13 : {

			reading : 'SAMENESS WITH PEOPLE',
			lines : [YANG,YIN,YANG,YANG,YANG,YANG]
		},

		15 : {

			reading : 'HUMILITY',
			lines : [YIN,YIN,YANG,YIN,YIN,YIN]
		},

		17 : {

			reading : 'FOLLOWING',
			lines : [YANG,YIN,YIN,YANG,YANG,YIN]
		},

		19 : {

			reading : 'OVERSEEING',
			lines : [YANG,YANG,YIN,YIN,YIN,YIN]
		},

		21 : {

			reading : 'BITING THROUGH',
			lines : [YANG,YIN,YIN,YANG,YIN,YANG]
		},

		23 : {

			reading : 'STRIPPING AWAY',
			lines : [YIN,YIN,YIN,YIN,YIN,YANG]
		},

		25 : {

			reading : 'FIDELITY (NO ERROR)',
			lines : [YANG,YIN,YIN,YANG,YANG,YANG]
		},

		27 : {

			reading : 'LOWER JAW (NOURISHMENT)',
			lines : [YANG,YIN,YIN,YIN,YIN,YANG]
		},

		29 : {

			reading : 'MASTERING PITFALLS',
			lines : [YIN,YANG,YIN,YIN,YANG,YIN]
		},

		31 : {

			reading : 'SENSITIVITY',
			lines : [YIN,YIN,YANG,YANG,YANG,YIN]
		},

		33 : {

			reading : 'WITHDRAWAL',
			lines : [YIN,YIN,YANG,YANG,YANG,YANG]
		},

		35 : {

			reading : 'ADVANCE',
			lines : [YIN,YIN,YIN,YANG,YIN,YANG]
		},

		37 : {

			reading : 'PEOPLE IN THE HOME',
			lines : [YANG,YIN,YANG,YIN,YANG,YANG]
		},

		39 : {

			reading : 'HALTING (TROUBLE)',
			lines : [YIN,YIN,YANG,YIN,YANG,YIN]
		},

		41 : {

			reading : 'REDUCTION',
			lines : [YANG,YANG,YIN,YIN,YIN,YANG]
		},

		43 : {

			reading : 'PARTING',
			lines : [YANG,YANG,YANG,YANG,YANG,YIN]
		},

		45 : {

			reading : 'GATHERING',
			lines : [YIN,YIN,YIN,YANG,YANG,YIN]
		},

		47 : {

			reading : 'EXHAUSTION',
			lines : [YIN,YANG,YIN,YANG,YANG,YIN]
		},

		49 : {

			reading : 'REVOLUTION',
			lines : [YANG,YIN,YANG,YANG,YANG,YIN]
		},

		51 : {

			reading : 'THUNDER',
			lines : [YANG,YIN,YIN,YANG,YIN,YIN]
		},

		53 : {

			reading : 'GRADUAL PROGRESS',
			lines : [YIN,YIN,YANG,YIN,YANG,YANG]
		},

		55 : {

			reading : 'RICHNESS',
			lines : [YANG,YIN,YANG,YANG,YIN,YIN]
		},

		57 : {

			reading : 'WIND',
			lines : [YIN,YANG,YANG,YIN,YANG,YANG]
		},

		59 : {

			reading : 'DISPERSAL',
			lines : [YIN,YANG,YIN,YIN,YANG,YANG]
		},

		61 : {

			reading : 'FAITHFULNESS IN THE CENTER',
			lines : [YANG,YANG,YIN,YIN,YANG,YANG]
		},

		63 : {

			reading : 'SETTLED',
			lines : [YANG,YIN,YANG,YIN,YANG,YIN]
		},

		2 : {

			reading : 'EARTH',
			lines : [YIN,YIN,YIN,YIN,YIN,YIN]

		},

		4 : {

			reading : 'DARKNESS',
			lines : [YIN,YANG,YIN,YIN,YIN,YANG]
		},

		6 : {

			reading : 'CONTENTION',
			lines : [YIN,YANG,YIN,YANG,YANG,YANG]
		},

		8 : {

			reading : 'ACCORD',
			lines : [YIN,YIN,YIN,YIN,YANG,YIN]
		},

		10 : {

			reading : 'TREADING',
			lines : [YANG,YANG,YIN,YANG,YANG,YANG]
		},

		12 : {

			reading : 'OBSTRUCTION',
			lines : [YIN,YIN,YIN,YANG,YANG,YANG]
		},

		14 : {

			reading : 'GREAT POSSESSION',
			lines : [YANG,YANG,YANG,YANG,YIN,YANG]
		},

		16 : {

			reading : 'JOY',
			lines : [YIN,YIN,YIN,YANG,YIN,YIN]
		},

		18 : {

			reading : 'DEGENERATION',
			lines : [YIN,YANG,YANG,YIN,YIN,YANG]
		},

		20 : {

			reading : 'OBSERVATION',
			lines : [YIN,YIN,YIN,YIN,YANG,YANG]
		},

		22 : {

			reading : 'ADORNMENT',
			lines : [YANG,YIN,YANG,YIN,YIN,YANG]
		},

		24 : {

			reading : 'RETURN',
			lines : [YANG,YIN,YIN,YIN,YIN,YIN]
		},

		26 : {

			reading : 'NURTURANCE OF THE GREAT',
			lines : [YANG,YANG,YANG,YIN,YIN,YANG]
		},

		28 : {

			reading : 'EXCESS OF THE GREAT',
			lines : [YIN,YANG,YANG,YANG,YANG,YIN]
		},

		30 : {

			reading : 'FIRE',
			lines : [YANG,YIN,YANG,YANG,YIN,YANG]
		},

		32 : {

			reading : 'CONSTANCY',
			lines : [YIN,YANG,YANG,YANG,YIN,YIN]
		},

		34 : {

			reading : 'GREAT POWER',
			lines : [YANG,YANG,YANG,YANG,YIN,YIN]
		},

		36 : {

			reading : 'CONCEALMENT OF ILLUMINATION',
			lines : [YANG,YIN,YANG,YIN,YIN,YIN]
		},

		38 : {

			reading : 'DISHARMONY',
			lines : [YANG,YANG,YIN,YANG,YIN,YANG]
		},

		40 : {

			reading : 'LIBERATION',
			lines : [YIN,YANG,YIN,YANG,YIN,YIN]
		},

		42 : {

			reading : 'INCREASE',
			lines : [YANG,YIN,YIN,YIN,YANG,YANG]
		},

		44 : {

			reading : 'MEETING',
			lines : [YIN,YANG,YANG,YANG,YANG,YANG]
		},

		46 : {

			reading : 'RISING',
			lines : [YIN,YANG,YANG,YIN,YIN,YIN]
		},

		48 : {

			reading : 'THE WELL',
			lines : [YIN,YANG,YANG,YIN,YANG,YIN]
		},

		50 : {

			reading : 'THE CAULDRON',
			lines : [YIN,YANG,YANG,YANG,YIN,YANG]
		},

		52 : {

			reading : 'MOUNTAIN',
			lines : [YIN,YIN,YANG,YIN,YIN,YANG]
		},

		54 : {

			reading : 'MAKING A YOUNG GIRL MARRY',
			lines : [YANG,YANG,YIN,YANG,YIN,YIN]
		},

		56 : {

			reading : 'TRAVEL',
			lines : [YIN,YIN,YANG,YANG,YIN,YANG]
		},

		58 : {

			reading : 'JOY',
			lines : [YANG,YANG,YIN,YANG,YANG,YIN]
		},

		60 : {

			reading : 'DISCIPLINE',
			lines : [YANG,YANG,YIN,YIN,YANG,YIN]
		},

		62 : {

			reading : 'PREDOMINANCE OF THE SMALL',
			lines : [YIN,YIN,YANG,YANG,YIN,YIN]
		},

		64 : {

			reading : 'UNSETTLED',
			lines : [YIN,YANG,YIN,YANG,YIN,YANG]
		},

	};

})(window);