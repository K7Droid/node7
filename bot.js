console.log ('Bot tweeteador empezando...')

var Twit = require('twit');

var datos = require('./datos');
var T = new Twit(datos);

var stream = T.stream('user');

stream.on('tweet',EventoTweet);

function EventoTweet(event){
	//var fs = require('fs');
	//var json = JSON.stringify(event,null,2);
	//fs.writeFile("conttweet.json",json);
	var tweeteara = event.in_reply_to_screen_name;
	var text = event.text;
	var from = event.user.screen_name;

	console.log(from+' te acaba de tweetear ALV!');

	if(tweeteara == 'k7bot1'){
		var nuevotweet = '@'+from+'Llega tu imagen!';
		hacerTweet(nuevotweet)
	}
}

hacerTweet();
setInterval(hacerTweet,1000*60); //hacer la funcion cada minuto

function hacerTweet(txt){

	var num = Math.floor(Math.random()*100)

	T.post('statuses/update', { status: txt }, function(err, data, response) {
	  console.log('Funciono! '+data)
	})
}