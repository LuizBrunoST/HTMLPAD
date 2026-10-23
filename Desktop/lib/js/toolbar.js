/* Functional HTMLPAD++ toolbar; uses existing Ace editors and project storage. */
(function () {
"use strict";
var toolbar=document.querySelector(".hp-toolbar");
if(!toolbar)return;
var menus=Array.from(toolbar.querySelectorAll(".hp-dropdown"));
function editor(){
  var selected=document.querySelector(".app-editor-tabs .hp-tab-active");
  var id=selected&&selected.id.replace("btn-","");
  return id==="css"?window.css:id==="javascript"?window.javascript:window.html;
}
function selectEditor(){var e=editor();e.focus();return e;}
function assembledHTML(){
  var markup=window.html.getValue();
  var styles="<style>"+window.css.getValue()+"</style>";
  var scripts="<script>"+window.javascript.getValue().replace(/<\\/script/gi,"<\\/script")+"<"+"/script>";
  return styles+markup+scripts;
}
function download(filename,content,type){
  var blob=new Blob([content],{type:type||"text/html;charset=utf-8"});
  var url=URL.createObjectURL(blob),a=document.createElement("a");
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(function(){URL.revokeObjectURL(url);},1000);
}
function showProjects(){
  var sidebar=document.getElementById("mySidebar");
  if(window.innerWidth<=992&&sidebar.style.display!=="block"&&typeof window.w3_open==="function")window.w3_open();
  var input=document.getElementById("hp-project-search");
  if(input){input.focus();input.scrollIntoView({block:"nearest"});}
}
function exportZIP(){
  if(typeof JSZip!=="function"||typeof saveAs!=="function"){alert("Bibliotecas de exportação indisponíveis.");return;}
  var zip=new JSZip();
  zip.file("index.html",window.html.getValue());
  zip.file("style.css",window.css.getValue());
  zip.file("script.js",window.javascript.getValue());
  zip.generateAsync({type:"blob"}).then(function(blob){saveAs(blob,"htmlpad-projeto.zip");}).catch(function(){alert("Não foi possível exportar o ZIP.");});
}
function execute(action){
  if(action==="projects")showProjects();
  else if(action==="save")window.saveProject();
  else if(action==="download")download("index.html",assembledHTML());
  else if(action==="zip")exportZIP();
  else if(action==="undo")selectEditor().undo();
  else if(action==="redo")selectEditor().redo();
  else if(action==="find")selectEditor().execCommand("find");
  else if(action==="select")selectEditor().selectAll();
  else if(action==="clear"){var e=editor();if(confirm("Limpar o conteúdo da aba atual?")){e.setValue("",-1);e.focus();}}
  else if(action==="editor")document.getElementById("btn-html").click();
  else if(action==="preview")document.getElementById("btn-preview").click();
  else if(action==="fullscreen"){
    var el=document.querySelector(".app-editor-card");
    if(document.fullscreenElement)document.exitFullscreen();
    else if(el&&el.requestFullscreen)el.requestFullscreen().catch(function(){alert("Tela cheia indisponível neste navegador.");});
  }
  else if(action==="about")document.getElementById("modal-sobre").style.display="block";
  else if(action==="shortcuts")alert("Atalhos do editor Ace:\nCtrl+F: localizar\nCtrl+Z: desfazer\nCtrl+Shift+Z: refazer\nCtrl+A: selecionar tudo\nCtrl+S: salvar projeto (HTMLPAD++)");
}
toolbar.addEventListener("click",function(event){
  var button=event.target.closest("[data-hp-action]");
  if(!button)return;
  event.preventDefault();
  execute(button.dataset.hpAction);
  menus.forEach(function(m){m.open=false;});
});
menus.forEach(function(menu){menu.addEventListener("toggle",function(){if(menu.open)menus.forEach(function(other){if(other!==menu)other.open=false;});});});
document.addEventListener("click",function(event){if(!toolbar.contains(event.target))menus.forEach(function(m){m.open=false;});});
document.addEventListener("keydown",function(event){
  if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==="s"){
    event.preventDefault();execute("save");
  }
  if(event.key==="Escape")menus.forEach(function(m){m.open=false;});
});
})();
