console.log ('Bot tweeteador empezando...')

var Twit = require('twit'); //npm para usar la api de twitter

var datos = require('./datos'); //datos = las llaves para usar la api
var T = new Twit(datos);

var fs = require('fs'); //Paquete para leer archivos

var b64content = fs.readFileSync('images/auron.png', { encoding: 'base64' }) //base64 de la imagen

var stream = T.stream('statuses/filter', { track: ['@K7Bot1'] }); //detectar cuando le tweeteen a esa cuenta

stream.on('tweet',EventoTweet);

function EventoTweet(tweet) { 

    var nombre = tweet.user.screen_name; // Quien envió el tweet

	T.post('media/upload', { media_data: b64content }, function (err, data, response) {

	  var mediaIdStr = data.media_id_string
	  var txtRespuesta = "¡ @" + nombre + ' ' + 'no olvides tomar agua crack!'; //La respuesta a la mencion
	  var parametros = { media_id: mediaIdStr, alt_text: { text: txtRespuesta } }
	 
	  T.post('media/metadata/create', parametros, function (err, data, response) {
	    if (!err) {
	      //agregar media al tweet
	      var params = { status: txtRespuesta, media_ids: [mediaIdStr] }
	 
	      T.post('statuses/update', params, function (err, data, response) {
	        console.log(data)
	      })
	    }
	  })
	})
};
