/* Isolated preview console bridge; no external dependencies. */
(function(){
"use strict";
var frame=document.getElementById("preview");
var panel=document.getElementById("hp-console");
var output=document.getElementById("hp-console-messages");
var count=document.getElementById("hp-console-count");
var filter=document.getElementById("hp-console-filter");
var toggle=document.getElementById("hp-console-toggle");
var messages=[],nonce="",limit=300;
function stringify(value){
 if(typeof value==="string")return value;
 if(value===undefined)return "undefined";
 if(value===null)return "null";
 try{return JSON.stringify(value);}catch(e){return String(value);}
}
function display(){
 output.replaceChildren();
 var selected=filter.value,shown=messages.filter(function(m){return selected==="all"||m.type===selected;});
 if(!shown.length){var empty=document.createElement("p");empty.className="hp-console-empty";empty.textContent=messages.length?"Nenhuma mensagem para este filtro.":"Nenhuma mensagem no console.";output.appendChild(empty);}
 shown.forEach(function(m){
  var row=document.createElement("div");row.className="hp-console-row hp-console-"+m.type;
  var ico=document.createElement("i");ico.className="fa-solid "+(m.type==="error"?"fa-circle-xmark":m.type==="warn"?"fa-triangle-exclamation":m.type==="info"?"fa-circle-info":"fa-angle-right");
  var body=document.createElement("span");body.textContent=m.text;
  row.append(ico,body);output.appendChild(row);
 });
 count.textContent=String(messages.length);
 output.scrollTop=output.scrollHeight;
}
function push(type,args){
 messages.push({type:type,text:args.map(stringify).join(" ")});
 if(messages.length>limit)messages.shift();
 display();
}
window.addEventListener("message",function(event){
 if(event.source!==frame.contentWindow)return;
 var data=event.data;
 if(!data||data.kind!=="htmlpad-preview-console"||data.nonce!==nonce)return;
 if(!["log","info","warn","error"].includes(data.type)||!Array.isArray(data.args))return;
 push(data.type,data.args.slice(0,20));
});
function bridge(){
 var n=JSON.stringify(nonce);
 return "(function(){"+
 "var nonce="+n+";"+
 "function fmt(v){if(typeof v==='string')return v;if(v===undefined)return 'undefined';try{return JSON.stringify(v);}catch(e){return String(v);}}"+
 "function send(type,args){try{parent.postMessage({kind:'htmlpad-preview-console',nonce:nonce,type:type,args:Array.prototype.slice.call(args,0,20).map(fmt)},'*');}catch(e){}}"+
 "['log','info','warn','error'].forEach(function(type){var old=console[type];console[type]=function(){send(type,arguments);if(old)old.apply(console,arguments);};});"+
 "window.addEventListener('error',function(e){send('error',[e.message+' ('+(e.filename||'script')+':'+e.lineno+':'+e.colno+')']);});"+
 "window.addEventListener('unhandledrejection',function(e){send('error',['Promise rejeitada:',fmt(e.reason)]);});"+
 "})();";
}
window.hpBuildPreview=function(){
 nonce=String(Date.now())+"-"+Math.random().toString(36).slice(2);
 messages=[];display();
 var instrument="<script>"+bridge()+"<"+"/script>";
 var markup=window.html.getValue();
 // Insert before all user scripts, while keeping a leading doctype intact.
 var doctype=markup.match(/^\s*<!doctype[^>]*>/i);
 if(doctype)markup=markup.slice(0,doctype[0].length)+instrument+markup.slice(doctype[0].length);
 else markup=instrument+markup;
 return "<style>"+window.css.getValue()+"</style>"+markup+"<script>"+window.javascript.getValue()+"<"+"/script>";
};
document.getElementById("hp-console-clear").addEventListener("click",function(){messages=[];display();});
filter.addEventListener("change",display);
toggle.addEventListener("click",function(){var closed=panel.classList.toggle("hp-console-collapsed");toggle.setAttribute("aria-expanded",String(!closed));});
display();
})();
