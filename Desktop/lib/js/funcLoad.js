$(document).ready(() => {

    //#region HTML
    html = ace.edit("html")
    html.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
	html.setTheme("ace/theme/monokai")
	html.session.setMode("ace/mode/html")
    html.session.setValue("<p>Olá, mundo!</p>");
    html.setFontSize(13);
    //#endregion

    //#region CSS
    css = ace.edit("css")
    css.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
	css.setTheme("ace/theme/monokai")
	css.session.setMode("ace/mode/css")
    css.setFontSize(13);
    css.session.setValue(
`body {
    background: #fff;
    color: #000;
}`)
    //#endregion

    //#region JAVASCRIPT
    javascript = ace.edit("javascript")
	javascript.setTheme("ace/theme/monokai")
	javascript.session.setMode("ace/mode/javascript")
    javascript.session.setValue("console.log(\"Olá mundo!\")")
    javascript.setFontSize(13);
    javascript.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
    //#endregion

    $("#preview").attr("srcdoc", "<style>" + css.getValue("\n") + "</style>" + html.getValue("\n") + "<script>" + javascript.getValue("\n") + "<" + "/script>");
    

    //#region HTML
    htmlMobile = ace.edit("html-mobile")
    htmlMobile.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
	htmlMobile.setTheme("ace/theme/monokai")
	htmlMobile.session.setMode("ace/mode/html")
    htmlMobile.session.setValue("<p>Olá, mundo!</p>")
    //#endregion

        //#region CSS
        cssMobile = ace.edit("css-mobile")
        cssMobile.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            tabSize: 4
        })
        cssMobile.setTheme("ace/theme/monokai")
        cssMobile.session.setMode("ace/mode/css")
        cssMobile.session.setValue(
    `body {
        background: #fff;
        color: #000;
    }`)
        //#endregion
    
        //#region JAVASCRIPT
        javascriptMobile = ace.edit("javascript-mobile")
        javascriptMobile.setTheme("ace/theme/monokai")
        javascriptMobile.session.setMode("ace/mode/javascript")
        javascriptMobile.session.setValue("console.log(\"Olá mundo!\")")
        javascriptMobile.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            tabSize: 4
        })
        //#endregion

        $("#preview").attr("srcdoc", "<style>" + cssMobile.getValue("\n") + "</style>" + htmlMobile.getValue("\n") + "<script>" + javascriptMobile.getValue("\n") + "<" + "/script>");

    $(function() {
        $(".resizable").resizable({
            handles: "e, w",
            containment: ".container",
            resize: function(event, ui) {
                var containerWidth = $(".container").width();
                var currentWidth1 = $("#html").width();
                var currentWidth2 = $("#css").width();
                var currentWidth3 = $("#javascript").width();
                var currentWidth4 = $("#preview").width();

                var totalWidth = currentWidth1 + currentWidth2 + currentWidth3 + currentWidth4;
                var percentageWidth1 = (currentWidth1 / totalWidth) * 100;
                var percentageWidth2 = (currentWidth2 / totalWidth) * 100;
                var percentageWidth3 = (currentWidth3 / totalWidth) * 100;
                var percentageWidth4 = (currentWidth4 / totalWidth) * 100;

                $("#html").width(percentageWidth1 + "%");
                $("#css").width(percentageWidth2 + "%");
                $("#javascript").width(percentageWidth3 + "%");
                $("#preview").width(percentageWidth4 + "%");
            }
        });
    });

    //Carregamento depois de 1 segundo (Mostrando objetos nos editores)
    setTimeout(()=>{
        $('#html').append(`
            <span class="w3-display-topright w3-tag w3-red w3-round w3-large" style="z-index:8888;">HTML</span>
        `);
        $('#css').append(`
            <span class="w3-display-topright w3-tag w3-red w3-round w3-large" style="z-index:8888;">CSS</span>
        `);
        $('#javascript').append(`
            <span class="w3-display-topright w3-tag w3-red w3-round w3-large" style="z-index:8888;">JS</span>
        `);
    },1000);

    var userAgent = navigator.userAgent;
    exibirNavegador = $('#exibir-navegador');
    if (userAgent.indexOf("Chrome") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-chrome"></i> Ver no Google Chrome');
    }else if (userAgent.indexOf("Firefox") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-firefox"></i> Ver no Firefox');
    }else if (userAgent.indexOf("Safari") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-safari"></i> Ver no Safari');
    }else if (userAgent.indexOf("Edg") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-edge"></i> Ver no Edge');
    }else if (userAgent.indexOf("MSIE") != -1 || userAgent.indexOf("Trident") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-internet-explorer"></i> Ver no Explorer');
    } else if (userAgent.indexOf("Opera") != -1 || userAgent.indexOf("OPR") != -1) {
        exibirNavegador.html('<i class="fa-brands fa-opera"></i> Ver no Opera');
    } else {
        exibirNavegador.html('Erro de navegador');
    }

    
});
