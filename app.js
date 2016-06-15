var express = require('express'); 
var http = require('http');

var app = express();
var server = http.createServer(app);

app.set('view engine','ejs');
app.use(express.static(__dirname+"/public"));

server.listen(3000, function(){
    console.log("Corriendo en el puerto 3000");
})

app.get('/', function(llamado, respuesta){    
    var data = {
    	"title":"Home - votePokemon",
    	"uri":"success"    	
    };
    respuesta.render(__dirname+'/view/templates/default/index.ejs',{datos:data});
});

app.use('*',function (req,res) {
	var data = {
    	"title":"404 - votePokemon",
    	"uri":"404"
    };
    res.status(404).render(__dirname+'/view/templates/default/index.ejs',{datos:data});    
	// res.status(404).send('Sorry cant find that!');
})