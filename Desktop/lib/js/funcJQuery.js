$("#btn-minimizar-janela").click(function () {
    window.moveTo(0, 0)
    window.resizeTo(screen.width, screen.height)
})
$("#btn-fechar-janela").click( function () {
    confirmacao = confirm("Deseja fechar a janela atual?")
    if (confirmacao == true) {
        close()
    } else {

    }
})


$("#btn-html").click( function () {
    w3.show("#html")
    w3.hide("#css")
    w3.hide("#javascript")
    $(this).addClass("w3-theme-action")
    $("#btn-css").removeClass("w3-theme-action")
    $("#btn-javascript").removeClass("w3-theme-action")
})
$("#btn-css").click( function () {
    w3.show("#css")
    w3.hide("#html")
    w3.hide("#javascript")
    $(this).addClass("w3-theme-action")
    $("#btn-html").removeClass("w3-theme-action")
    $("#btn-javascript").removeClass("w3-theme-action")
})
$("#btn-javascript").click( function () {
    w3.show("#javascript")
    w3.hide("#html")
    w3.hide("#css")
    $(this).addClass("w3-theme-action")
    $("#btn-html").removeClass("w3-theme-action")
    $("#btn-css").removeClass("w3-theme-action")
})

$("#btn-preview").click(function() {
    $("#preview").attr("srcdoc", "<style>" + css.getValue("\n") + "</style>" + html.getValue("\n") + "<script>" + javascript.getValue("\n") + "<" + "/script>")
    $("#modal-preview").slideDown()
})
$("#btn-fechar-preview").click( function() {
    $("#modal-preview").slideUp()
})
$("#btn-salvar").click( function () {
    var element = document.createElement('a');
    code = document.getElementById('preview').srcdoc;
    element.setAttribute('href', 'data:text/text;charset=utf-8,' +      encodeURI(code));
    element.setAttribute('download', "index.html");
    element.click();
})