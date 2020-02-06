var sidebar = '<div id="aviva_cobranca" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Aviva Cobrança"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Aviva Cobrança</div><div></div></section></div><div id="aviva_smi" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Aviva SMI"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Aviva SMI</div><div></div></section></div><div id="aviva_cob_simples" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Aviva Cobrança Simples"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Aviva Cobrança Simples</div><div></div></section></div><div id="aviva_vendas_ws" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Aviva Vendas WS"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Aviva Vendas WS</div><div></div></section></div><div id="sanofi_front" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Sanofi WS Ativo"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Sanofi WS Ativo</div><div></div></section></div><div id="sanofi_bot" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Sanofi Bot"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Sanofi Bot</div><div></div></section></div><div id="lar_de_maria_wpp" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Lar de Maria - WPP"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Lar de Maria - WhatsApp</div><div></div></section></div><div id="lar_de_maria_smi" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Lar de Maria - SMI"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Lar de Maria - SMI</div><div></div></section></div><div id="cruzeiro_disparos" class="sidebar_item w3-display-container cruz_dash" data-toggle="tooltip" data-placement="right" title="Cruzeiro do Sul - Disparos"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Cruzeiro do Sul - Disparos</div><div></div></section></div><div id="mapfre_espanha" class="sidebar_item w3-display-container" data-toggle="tooltip" data-placement="right" title="Mapfre Espanha"> <div class="icon"> <i class="far fa-chart-bar"></i></div><section class="section d-none"> <div>Mapfre Espanha</div><div></div></section></div>'

document.getElementById("sidebar").innerHTML = sidebar

$("#aviva_cobranca").on("click", function () {
    window.location = "/aviva_cobranca?token=" + token
});
$("#aviva_cob_simples").on("click", function () {
    console.log = "foi"
    window.location.href = "../../../../views/aviva_cob_simples.html"
});
$("#aviva_smi").on("click", function () {
    
});
$("#aviva_vendas_ws").on("click", function () {
    window.location = "/aviva_vendas_ws?token=" + token
});
$("#sanofi_front").on("click", function () {
    window.location = "/sanofi_front_ws?token=" + token
});
$("#sanofi_bot").on("click", function () {
    window.location = "/sanofi_bot?token=" + token
});
$("#lar_de_maria_wpp").on("click", function () {
    window.location = "/lar_de_maria_wpp?token=" + token
});
$("#lar_de_maria_smi").on("click", function () {
    window.location = "/lar_de_maria_smi?token=" + token
});
$("#aviva_ws").on("click", function () {
    window.location = "/aviva_ws?token=" + token
});
$("#cruzeiro_disparos").on("click", function () {
    window.location = "/cruzeiro_disparos?token=" + token
});
$("#mapfre_espanha").on("click", function () {
    window.location = "/mapfre_espanha?token=" + token
});
/*

*/