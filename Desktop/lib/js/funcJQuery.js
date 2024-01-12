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
    element.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', "snippets.html");
    element.click();
})

$(document).ready(function() {
    // Função para realizar a requisição AJAX e atualizar a div com o conteúdo da resposta
    function ajax(url, divClass) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
            // Atualiza a div com o conteúdo da resposta
            $(divClass).html(response);
            }
        });
    }

// Função para carregar os anúncios
function loadAds() {
    // Array de URLs e classes de div correspondentes
    var urls = [
        {
            url: 'https://www.lumamax.com.br/api/sdkAds/ads?id_usuario=1&site=8&id_bloco=14',
            divClass: '.adMax1'
        },
        {
            url: 'https://www.lumamax.com.br/api/sdkAds/ads?id_usuario=1&site=8&id_bloco=15',
            divClass: '.adMax2'
        }
        // Adicione mais objetos URL/divClass conforme necessário
    ];

    // Percorre o array de URLs e classes de div
    for (var i = 0; i < urls.length; i++) {
            var url = urls[i].url;
            var divClass = urls[i].divClass;

            // Chama a função ajax() para cada URL e classe de div correspondente
            ajax(url, divClass);
        }
    }

    // Função principal que é executada quando o documento estiver pronto
    $(document).ready(function() {
        // Chama a função loadAds() para carregar os anúncios
        loadAds();
    });
});