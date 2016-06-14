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
    console.log(__dirname);
    var title = __dirname;
    respuesta.render(__dirname+'/view/templates/default/index.ejs');
});