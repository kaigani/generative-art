/**
 * @author Kaigani <kai@kaigani.com>
 */


/**
 * Dictionary class for Pocket Guru
 *
 * @class Dictionary
 *
 */
 
 var Dictionary = function(){

 	var dict = this;
 	//this.data;
 	this.hasLoaded = false;
 	this.onload = null;

 	fetch('./data/kant.txt').then(function(response) {
	  var contentType = response.headers.get("content-type");
	  console.log('Content-type: ',contentType);

	  return response.text().then(function(text) {
	      // process text block
	      //var buffer = text.replace(/\W*/g,' ');
	      //buffer = buffer.replace(/\s+/g,' ');
	      dict.data = text.split(/\n/);
	      console.log("DICTIONARY WORD:",dict.data[parseInt(Math.random()*dict.data.length)]);
	      dict.hasLoaded = true;

	      if(this.onload) this.onload.call();
	  });
	  
	});
 };

Dictionary.prototype.getData = function(){ return dict.data; }

 Dictionary.prototype.getRandomWord = function(callback){

	//var wordnikEndpoint = "http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=false&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

/*
	$.getJSON(wordnikEndpoint,function(data){

		//CTRL.word = (Math.random() < 0.1)?CTRL.OTTO.randomWord():data.word; // randomly invented word 1% of the time
		if(callback){
			callback(data.word);
		}
	});

*/

/*
	fetch(wordnikEndpoint).then(function(response) {
	  var contentType = response.headers.get("content-type");
	  if(contentType && contentType.indexOf("application/json") !== -1) {
	    return response.json().then(function(json) {
	      // process your JSON further
	      console.log("Word found:",json.word);
	      callback(json.word);
	    });
	  } else {
	    console.log("Oops, we haven't got JSON!");
	  }
	});
*/

	callback(dict.data[parseInt(Math.random()*dict.data.length)])

 };

 



 Dictionary.prototype.getRandomAdjective = function(callback){

	var wordnikEndpoint = "http://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&includePartOfSpeech=adjective&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5";

	$.getJSON(wordnikEndpoint,function(data){

		if(callback){
			console.log("Callback word: " + data.word);
			callback(data.word);
		}
	});

 };
