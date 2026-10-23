/* Workspace UI refinements; project storage and preview logic remain unchanged. */
(function () {
    "use strict";
    var names = {html:"HTML",css:"CSS",javascript:"JavaScript",preview:"Pré-visualização"};
    var active = "html";
    var dirty = false;
    var baselineValues = {};
    var baseline = null;
    var editors = {html:window.html,css:window.css,javascript:window.javascript};
    var status = document.getElementById("hp-status");
    var position = document.getElementById("hp-position");
    var language = document.getElementById("hp-current-language");
    function snapshot() {
        return JSON.stringify({
            html: editors.html.getValue(),
            css: editors.css.getValue(),
            javascript: editors.javascript.getValue()
        });
    }
    function setBaseline() {
        baseline = snapshot();
        Object.keys(editors).forEach(function(id){baselineValues[id] = editors[id].getValue();});
        refreshDirty();
    }
    function refreshDirty() {
        dirty = baseline !== null && snapshot() !== baseline;
        status.textContent = dirty ? "Alterações não salvas" : "Sem alterações pendentes";
        status.classList.toggle("hp-dirty",dirty);
        status.classList.toggle("hp-saved",!dirty);
        Object.keys(editors).forEach(function(id){
            var tab=document.getElementById("btn-"+id);
            if(tab)tab.classList.toggle("hp-has-changes",editors[id].getValue()!==baselineValues[id]);
        });
    }
    function refreshCursor() {
        if (active === "preview") {position.textContent = "Visualização";return;}
        var p = editors[active].getCursorPosition();
        position.textContent = "Ln " + (p.row+1) + ", Col " + (p.column+1);
    }
    function selectTab(tab) {
        active = tab;
        language.textContent = names[tab];
        ["html","css","javascript","preview"].forEach(function(id){
            var button=document.getElementById("btn-"+id);
            if (!button) return;
            button.classList.toggle("hp-tab-active",id===tab);
            button.setAttribute("aria-selected",String(id===tab));
        });
        refreshCursor();
        if (tab !== "preview") {
            requestAnimationFrame(function(){editors[tab].resize();});
        }
    }
    ["html","css","javascript","preview"].forEach(function(id){
        var btn=document.getElementById("btn-"+id);
        if (btn) btn.addEventListener("click",function(){selectTab(id);});
    });
    Object.keys(editors).forEach(function(id){
        editors[id].session.on("change",refreshDirty);
        editors[id].selection.on("changeCursor",function(){if(active===id) refreshCursor();});
    });
    // Existing project actions are global functions. Wrap without changing storage semantics.
    if(typeof window.saveProject==="function"){
        var originalSave=window.saveProject;
        window.saveProject=function(){
            var before=localStorage.getItem("htmlpad");
            originalSave.apply(this,arguments);
            if(localStorage.getItem("htmlpad")!==before) setBaseline();
        };
    }
    if(typeof window.loadProject==="function"){
        var originalLoad=window.loadProject;
        window.loadProject=function(){originalLoad.apply(this,arguments);setBaseline();refreshCursor();};
    }
    document.addEventListener("keydown",function(event){
        if((event.ctrlKey||event.metaKey) && !event.altKey && !event.shiftKey && /^[1-4]$/.test(event.key)){
            event.preventDefault();
            var tabs=["html","css","javascript","preview"];
            document.getElementById("btn-"+tabs[Number(event.key)-1]).click();
        }
    });
    var fullscreenButton=document.getElementById("hp-tabs-fullscreen");
    if(fullscreenButton)fullscreenButton.addEventListener("click",function(){
        var card=document.querySelector(".app-editor-card");
        if(document.fullscreenElement){document.exitFullscreen();}
        else if(card&&card.requestFullscreen)card.requestFullscreen().catch(function(){alert("Tela cheia indisponível.");});
    });
    var version=document.getElementById("version");
    var statusVersion=document.getElementById("hp-version");
    if(version && statusVersion) statusVersion.textContent=version.textContent||"—";
    setBaseline();
    selectTab("html");
})();
