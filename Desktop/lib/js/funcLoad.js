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
    html.session.setValue(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>    
    `);
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
