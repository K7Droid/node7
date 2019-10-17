console.log ('probando...')

var Twit = require('twit');

var datos = require('./datos');
var T = new Twit(datos);

//Buscar Tweets
var parametros = {
	q: 'Guatemala',
	count: 2
}

hacerTweet();
setInterval(hacerTweet,1000*60); //hacer la funcion cada minuto

function hacerTweet(){

	var num = Math.floor(Math.random()*100)

	T.post('statuses/update', { status: 'Probando 1..2..'+num }, function(err, data, response) {
	  console.log('Funciono! '+data)
	})
}