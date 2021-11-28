window.onload = function() {
	html = ace.edit("html")
	html.setTheme("ace/theme/monokai")
	html.session.setMode("ace/mode/html")
    html.session.setValue("<p>Olá, mundo!</p>")

    css = ace.edit("css")
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
}