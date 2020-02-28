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
//---------------------------//
$(document).ready(function () {
    setTimeout(function () {
        var jogadores = jogador.where(function(obj) {
            return obj.nome != null;
          })
        jogadores = jogadores.reverse()
        console.log(jogadores);
        for (let i = 0; i < jogador.count(); i++) {
            var linha = `
            <tr>
                <td>`+jogadores[i].$loki+`</td>
                <td>`+jogadores[i].nome+`</td>
                <td>`+jogadores[i].equipe+`</td>
                <td>
                    <input type="radio" class="radio" id="`+jogadores[i].nome+`presente" name="`+jogadores[i].nome+`">
                    <label for="`+jogadores[i].nome+`presente">Presente</label>
                    <input type="radio" class="radio" id="`+jogadores[i].nome+`ausente" name="`+jogadores[i].nome+`">
                    <label for="`+jogadores[i].nome+`ausente">Ausente</label>
                </td>
            </tr>
            `
            console.log("foi");
            
            $("#jogadoresCorpo").append(linha);
        }
    },1000)
})