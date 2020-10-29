/*
 * TTS - Text-to-Speech API
 *
 *	
 *	METHODS
 *  -------
 *  
 *  speakText( AudioHandler , text) - reads text using on of the TTS servers at random
 *
 *
 *	TODO » Should be error checking API endpoint responses
 *
 */

// REWORKED TO USE WEB API - SPEECH SYNTHESIS

var TextToSpeech = function(){};

TextToSpeech.prototype.speakText = function(text){

	text = text.replace(/^\W*/,'');
	var msg = new SpeechSynthesisUtterance(text);
	var voices = window.speechSynthesis.getVoices();

	var randomVoice = Math.floor(Math.random()*voices.length);
	msg.voice = voices[randomVoice]; // Note: some voices don't support altering params

	window.speechSynthesis.speak(msg);

};



