(function(){
"use strict";
var bar=document.getElementById("hp-storage-bar"),info=document.getElementById("hp-storage-info");
if(!bar||!info)return;
var approxLimit=5*1024*1024;
function format(bytes){return bytes>=1048576?(bytes/1048576).toFixed(2)+" MiB":(bytes/1024).toFixed(1)+" KiB";}
function refresh(){
 var raw="";
 try{raw=localStorage.getItem("htmlpad")||"[]";}catch(e){info.textContent="Armazenamento indisponível";return;}
 // localStorage is commonly limited by UTF-16 storage quotas; estimate two bytes per code unit.
 var bytes=("htmlpad".length+raw.length)*2;
 var percent=Math.min(100,bytes/approxLimit*100);
 bar.style.width=percent+"%";
 bar.classList.toggle("hp-storage-warning",percent>=75);
 info.textContent=format(bytes)+" em projetos · referência: 5 MiB";
 bar.title="Estimativa: "+percent.toFixed(1)+"% de 5 MiB; limite não garantido";
}
window.addEventListener("storage",refresh);
document.addEventListener("hp-project-baseline",refresh);
var old=window.loadProjects;
if(typeof old==="function")window.loadProjects=function(){var result=old.apply(this,arguments);refresh();return result;};
refresh();
})();
