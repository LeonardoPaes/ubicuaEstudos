var $ = require('jQuery');
var loki = require('lokijs');

//---------------------------//
var db = new loki('loki.json', {
	autoload: true,
	autoloadCallback : databaseInitialize,
	autosave: true, 
	autosaveInterval: 4000
});

var jogador

function databaseInitialize() {
    jogador = db.getCollection("jogador");
    if (jogador === null) {
        jogador = db.addCollection("jogador");
        console.log("passei");
    }
}

function createJogador(data) {
    jogador.insert(data);
    db.save(); 
}

//---------------------------//

$('#cadastrar-jogador').submit(function () {
    data = {
        nome:$('#nome').val(),
        equipe:$('#equipe').val()
    }
    createJogador(data);
    console.log(jogador.count())
})

//---------------------------//