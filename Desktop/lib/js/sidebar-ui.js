/* Desktop explorer collapse, persisted locally; mobile overlay remains unchanged. */
(function(){
"use strict";
var toggle=document.getElementById("hp-sidebar-toggle");
var expand=document.getElementById("hp-sidebar-expand");
var key="htmlpad-sidebar-collapsed";
function apply(collapsed){
 document.body.classList.toggle("hp-sidebar-collapsed",collapsed);
 toggle.setAttribute("aria-expanded",String(!collapsed));
 toggle.setAttribute("aria-label",collapsed?"Expandir explorador":"Recolher explorador");
 toggle.title=collapsed?"Expandir explorador":"Recolher explorador";
 toggle.querySelector("i").className=collapsed?"fa-solid fa-panel-left-open":"fa-solid fa-panel-left";
 try{localStorage.setItem(key,collapsed?"1":"0");}catch(e){}
}
function flip(){apply(!document.body.classList.contains("hp-sidebar-collapsed"));}
toggle.addEventListener("click",flip);
expand.addEventListener("click",function(){apply(false);});
try{apply(localStorage.getItem(key)==="1");}catch(e){apply(false);}
})();
