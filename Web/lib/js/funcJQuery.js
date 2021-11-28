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
})
$("#btn-css").click( function () {
    w3.show("#css")
    w3.hide("#html")
    w3.hide("#javascript")
})
$("#btn-javascript").click( function () {
    w3.show("#javascript")
    w3.hide("#html")
    w3.hide("#css")
})

$("#btn-preview").click(function() {
    document.querySelectorAll(".ace_gutter")[0].hidden = true
    document.querySelectorAll(".ace_gutter")[1].hidden = true
    document.querySelectorAll(".ace_gutter")[2].hidden = true
    $("#preview").attr("srcdoc", "<style>" + css.getValue("\n") + "</style>" + html.getValue("\n") + "<script>" + javascript.getValue("\n") + "<" + "/script>")
    $("#modal-preview").show(1000)
})
$("#btn-fechar-preview").click( function() {
    document.querySelectorAll(".ace_gutter")[0].hidden = false
    document.querySelectorAll(".ace_gutter")[1].hidden = false
    document.querySelectorAll(".ace_gutter")[2].hidden = false
    $("#modal-preview").hide(1000)
})
$("#btn-salvar").click( function () {
    var element = document.createElement('a');
    code=document.getElementById('preview').srcdoc;
    element.setAttribute('href', 'data:text/text;charset=utf-8,' +      encodeURI(code));
    element.setAttribute('download', "index.html");
    element.click();
})