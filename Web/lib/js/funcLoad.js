window.onload = function() {
    
	html = ace.edit("html")
    html.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
	html.setTheme("ace/theme/monokai")
	html.session.setMode("ace/mode/html")
    html.session.setValue("<p>Olá, mundo!</p>")

    css = ace.edit("css")
    css.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
	css.setTheme("ace/theme/monokai")
	css.session.setMode("ace/mode/css")
    css.session.setValue(
`body {
    background: #fff;
    color: #000;
}`)

    javascript = ace.edit("javascript")
	javascript.setTheme("ace/theme/monokai")
	javascript.session.setMode("ace/mode/javascript")
    javascript.session.setValue("")
    javascript.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
        tabSize: 4
    })
}