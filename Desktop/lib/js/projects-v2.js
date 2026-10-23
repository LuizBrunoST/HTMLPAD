/* HTMLPAD++ project management v2: no W3 CSS, native dialog, legacy storage preserved. */
(function(){
"use strict";
var key="htmlpad", activeIndex=null, pending=null;
var dialog=document.getElementById("hp-project-dialog");
var form=document.getElementById("hp-project-form"),field=document.getElementById("hp-dialog-field");
var input=document.getElementById("hp-dialog-name"),title=document.getElementById("hp-dialog-title");
var description=document.getElementById("hp-dialog-description"),error=document.getElementById("hp-dialog-error");
var submit=document.getElementById("hp-dialog-submit");
function projects(){try{var a=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(a)?a:[];}catch(e){throw new Error("Não foi possível ler os projetos salvos.");}}
function persist(a){localStorage.setItem(key,JSON.stringify(a));window.loadProjects();}
function contents(){return {html:window.html.getValue(),css:window.css.getValue(),js:window.javascript.getValue()};}
function changed(){var status=document.getElementById("hp-status");return !!(status&&status.classList.contains("hp-dirty"));}
function baseline(){document.dispatchEvent(new Event("hp-project-baseline"));}
function resolveIndex(reference,a){
 if(Number.isInteger(reference))return reference>=0&&reference<a.length?reference:-1;
 return a.findIndex(function(p){return p.projeto===reference;});
}
function modal(options){
 return new Promise(function(resolve){
  pending=resolve;
  title.textContent=options.title;
  description.textContent=options.description||"";
  field.hidden=!options.field;
  input.required=!!options.field;
  input.value=options.value||"";
  submit.textContent=options.submit||"Confirmar";
  error.textContent="";
  if(!dialog.open)dialog.showModal();
  if(options.field)setTimeout(function(){input.focus();input.select();},0);
 });
}
function finish(result){if(!pending)return;var done=pending;pending=null;dialog.close();done(result);}
form.addEventListener("submit",function(event){
 event.preventDefault();
 if(field.hidden){finish(true);return;}
 var value=input.value.trim();
 if(!value){error.textContent="Informe um nome para o projeto.";return;}
 finish(value);
});
document.getElementById("hp-dialog-close").addEventListener("click",function(){finish(null);});
document.getElementById("hp-dialog-cancel").addEventListener("click",function(){finish(null);});
dialog.addEventListener("cancel",function(e){e.preventDefault();finish(null);});
function report(e){console.error(e);alert(e.message||"Não foi possível concluir a operação.");}
async function saveAs(){
 try{
  var a=projects();
  var name=await modal({title:"Salvar como",description:"Crie um novo projeto com o código atual.",field:true,value:activeIndex===null?"":(a[activeIndex]?.projeto||""),submit:"Criar projeto"});
  if(name===null)return false;
  if(a.some(function(p){return p.projeto.toLocaleLowerCase()===name.toLocaleLowerCase();})){
   error.textContent="Já existe um projeto com esse nome.";
   return saveAsWithName(name);
  }
  a.push({projeto:name,content:contents()});
  persist(a);activeIndex=a.length-1;baseline();return true;
 }catch(e){report(e);return false;}
}
async function saveAsWithName(name){
 var other=await modal({title:"Nome já utilizado",description:"Escolha outro nome para não sobrescrever o projeto existente.",field:true,value:name,submit:"Salvar como"});
 if(other===null)return false;
 try{
  var a=projects();
  if(a.some(function(p){return p.projeto.toLocaleLowerCase()===other.toLocaleLowerCase();})){return saveAsWithName(other);}
  a.push({projeto:other,content:contents()});persist(a);activeIndex=a.length-1;baseline();return true;
 }catch(e){report(e);return false;}
}
window.saveProjectAs=saveAs;
window.saveProject=async function(){
 if(activeIndex===null)return saveAs();
 try{
  var a=projects();
  if(!a[activeIndex]){activeIndex=null;return saveAs();}
  a[activeIndex].content=contents();persist(a);baseline();return true;
 }catch(e){report(e);return false;}
};
window.loadProject=async function(reference){
 try{
  var a=projects(),index=resolveIndex(reference,a);
  if(index<0)return false;
  if(changed()){
   var ok=await modal({title:"Alterações não salvas",description:"Abrir outro projeto descartará as alterações atuais. Deseja continuar?",field:false,submit:"Descartar e abrir"});
   if(!ok)return false;
  }
  var c=a[index].content||{};
  window.html.setValue(c.html||"",-1);
  window.css.setValue(c.css||"",-1);
  window.javascript.setValue(c.js||"",-1);
  activeIndex=index;baseline();window.loadProjects();return true;
 }catch(e){report(e);return false;}
};
window.renameProject=async function(reference){
 try{
  var a=projects(),index=resolveIndex(reference,a);if(index<0)return;
  var name=await modal({title:"Renomear projeto",description:"O conteúdo do projeto será preservado.",field:true,value:a[index].projeto,submit:"Renomear"});
  if(name===null)return;
  if(a.some(function(p,i){return i!==index&&p.projeto.toLocaleLowerCase()===name.toLocaleLowerCase();})){
   await modal({title:"Nome indisponível",description:"Já existe outro projeto com esse nome.",field:false,submit:"Entendi"});return;
  }
  a[index].projeto=name;persist(a);
 }catch(e){report(e);}
};
window.deleteProject=async function(reference){
 try{
  var a=projects(),index=resolveIndex(reference,a);if(index<0)return;
  var ok=await modal({title:"Excluir projeto?",description:"O projeto “"+a[index].projeto+"” será removido deste navegador. Essa ação não pode ser desfeita.",field:false,submit:"Excluir projeto"});
  if(!ok)return;
  a.splice(index,1);persist(a);
  if(activeIndex===index)activeIndex=null;
  else if(activeIndex!==null&&activeIndex>index)activeIndex--;
 }catch(e){report(e);}
};
window.downloadProject=function(reference){
 try{
  var a=projects(),index=resolveIndex(reference,a);if(index<0)return;
  var p=a[index],zip=new JSZip();
  zip.file(p.projeto+".json",JSON.stringify(p));
  zip.file("index.html",p.content.html||"");
  zip.file("style.css",p.content.css||"");
  zip.file("script.js",p.content.js||"");
  zip.generateAsync({type:"blob"}).then(function(blob){saveAsBlob(blob,p.projeto+".zip");}).catch(report);
 }catch(e){report(e);}
};
function saveAsBlob(blob,name){if(typeof window.saveAs==="function")window.saveAs(blob,name);else report(new Error("Exportação indisponível."));}
window.addEventListener("beforeunload",function(event){if(changed()){event.preventDefault();event.returnValue="";}});
})();
