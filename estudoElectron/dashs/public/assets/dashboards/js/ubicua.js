// Initialize Bootstrap Tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})

$('.ubc_toggle').click(function () {
    if ($('#relatorio_sms').hasClass('d-none')) {
        //nothing
    }
    else {
        $('#relatorio_sms').toggleClass('d-none');
        $('#relatorio_arquivo').toggleClass('d-none');
        $('#relatorio_mailing').toggleClass('d-none');
    }
    if ($('#preparar_sms').hasClass('d-none')) {
        //nothing
    }
    else {
        $('#preparar_sms').toggleClass('d-none');
        $('#preparar_bwi').toggleClass('d-none');
        $('#painel_disparo').toggleClass('d-none');
    }
    if ($(document).width() > 850) {
        if ($('.sidebar').width() > 56) {
            $('.sidebar').css('width', '56px');
            $('.panel').css('padding-left', '56px');
            $('.section').toggleClass('d-none');
            $('[data-toggle="tooltip"]').tooltip('toggleEnabled')
        }
        else {
            $('.sidebar').css('width', '250px');
            $('.panel').css('padding-left', '250px');
            $('.section').toggleClass('d-none');
            $('[data-toggle="tooltip"]').tooltip('toggleEnabled')
        }
    }
    else {
        if ($('.sidebar').width() > 56) {
            $('.sidebar').css('display', 'none');
            $('.sidebar').css('width', '56px');
            $('.section').toggleClass('d-none');
            $('[data-toggle="tooltip"]').tooltip('toggleEnabled')
        }
        else {
            $('.sidebar').css('display', 'block');
            $('.sidebar').css('width', '250px');
            $('.section').toggleClass('d-none');
            $('[data-toggle="tooltip"]').tooltip('toggleEnabled')
        }
    }
})

$('#relatorio').click(function () {
    if ($('.sidebar').width() > 56) {
        $('#relatorio_sms').toggleClass('d-none');
        $('#relatorio_arquivo').toggleClass('d-none');
        $('#relatorio_mailing').toggleClass('d-none');
    }
    else {
        $('.ubc_toggle').trigger('click');
        $('#relatorio_sms').toggleClass('d-none');
        $('#relatorio_arquivo').toggleClass('d-none');
        $('#relatorio_mailing').toggleClass('d-none');
    }
});

$('#disparo').click(function () {
    if ($('.sidebar').width() > 56) {
        $('#preparar_sms').toggleClass('d-none');
        $('#preparar_bwi').toggleClass('d-none');
        $('#painel_disparo').toggleClass('d-none');
    }
    else {
        $('.ubc_toggle').trigger('click');
        $('#preparar_sms').toggleClass('d-none');
        $('#preparar_bwi').toggleClass('d-none');
        $('#painel_disparo').toggleClass('d-none');
    }
});

$(".fullscreenToggle").click(function(e){
    var chartZoom = e.target.closest("div.w3-card-4")
    $(chartZoom).toggleClass("fullscreen")
    
});

var token = sessionStorage.getItem("token")
var user = sessionStorage.getItem("user")

$("#user_name").text(user)

$('#home').click(function () {
    window.location = "/home?token=" + token
})
$("#logout").click(function () {
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (res) {
            console.log(res.token)
            sessionStorage.setItem("token", res.token)
            window.location = "/"
        }
    })
})
$("#logout2").click(function () {
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (res) {
            console.log(res.token)
            sessionStorage.setItem("token", res.token)
            window.location = "/"
        }
    })
})


