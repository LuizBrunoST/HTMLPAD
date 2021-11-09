$(function(){
    var isDarkTheme = true;
    var ehtml = ace.edit("html"),currEditor=ehtml,currEditorId='html';
    
    ehtml.setOptions({ 
    theme:"ace/theme/monokai", 
    mode: "ace/mode/html", 
    minLines: 10,
    autoScrollEditorIntoView: true,
     });
     
     ehtml.session.setValue("<p>Hello world !</p>");

    var ecss = ace.edit("css");
    ecss.setOptions({ 
    theme:"ace/theme/monokai", 
    mode: "ace/mode/css", 
    minLines: 10, 
    autoScrollEditorIntoView: true,
     });
     
     ecss.session.setValue(
`body{  
  
}`)

    var ejs = ace.edit("js");
    ejs.setOptions({ 
    theme:"ace/theme/monokai", 
    mode: "ace/mode/javascript", 
    minLines: 10,
    autoScrollEditorIntoView: true,
     });
     
     ejs.session.setValue("//Javascript document")
     
    $("#opt-btn").click(function(){
        $("#overlay, #opt-item").fadeToggle(200);
        $("li#reset-code").text("Clear "+ currEditorId);
        if(currEditorId == "output"){
            $("#opt-item").css("height","0px");
        }
        else{
            $("#opt-item").css("height","auto");
        }
    })
    
    $("#overlay").click(function(){
        if(!popup){
        $("#overlay, #opt-item").fadeOut(100);
        }
    });
    
    
    updateBtn = () =>{
    if(currEditor !== null){
        $("#undo-btn").attr("disabled",!currEditor.session.getUndoManager().hasUndo())
        $("#redo-btn").attr("disabled",!currEditor.session.getUndoManager().hasRedo())
        if($("#undo-btn").prop("disabled")){
            $("#undo-btn").css({"color":"lightgrey","opacity":"0.5"})
        }
       else if(!$("#undo-btn").prop("disabled")){
            $("#undo-btn").css({"color":"#fff","opacity":"1"})
        }
        
        if($("#redo-btn").prop("disabled")){
            $("#redo-btn").css({"color":"lightgrey","opacity":"0.5"})
        }
        else if(!$("#redo-btn").prop("disabled")){
            $("#redo-btn").css({"color":"#fff","opacity":"1"})
        }
    }
    }
    
    ehtml.on("input", updateBtn);
    ecss.on("input", updateBtn);
    ejs.on("input", updateBtn);
    updateBtn();
    
    var tstart = false;
    
    $(".editor-btns button").on("touchstart mousedown",function(){
        if(!tstart){
        $(this).css({"background":"lightgrey","opacity":"0.5"});
        tstart = true;
        }
    })
    
    $(".editor-btns button").on("touchend mouseup",function(){
        $(this).css({"background":"none","opacity":"1"});
        slide($(this).prop('value'))
        tstart = false;
        toggle($(this).prop("id"));
        currEditor = currEditorId = $(this).prop("id");
        currEditorId = currEditorId.slice(1,currEditorId.length);
        (currEditor == "#output")?$("#undo-btn,#redo-btn").hide():$("#undo-btn,#redo-btn").show();
        switch(currEditor){
            case "#html":currEditor=ehtml;break;
            case "#css":currEditor=ecss;break;
            case "#js":currEditor=ejs;break;
            default:currEditor=null;break;
        }
        
        updateBtn();
    })
    
    slide=(left)=>{
        $("#active-bar").css({"margin-left":left});
    }
    
    
    
    $("#undo-btn,#redo-btn").click(function(){
        if($(this).prop("id")=="undo-btn"){
            currEditor.undo();
        }
        else{
            currEditor.redo();
        }
        updateBtn();
    })

    function toggle(e){
        switch(e){
            case "#html":
               $("#html").css("left","0%");
               $("#css").css("left","100%");
               $("#js").css("left","200%");
               $("#output").css("left","300%");
               break;
               
            case "#css":
                $("#html").css("left","-100%");
                $("#css").css("left","0%");
               $("#js").css("left","100%");
               $("#output").css("left","200%");
               break;
               
            case "#js":
                $("#html").css("left","-200%");
                $("#css").css("left","-100%");
               $("#js").css("left","0%");
               $("#output").css("left","100%");
               break;
               
            case "#output":
                $("#html").css("left","-300%");
                $("#css").css("left","-200%");
               $("#js").css("left","-100%");
               $("#output").css("left","0%");
               break;
        } 
    }
    
    $("[name=frame]").click(function(){
        var scriptLinks="",cssLinks="";
        var scripts=[...$(".sLink")],css=[...$(".cLink")];
        if(scripts!==""){
        scripts.forEach(function(item){
            scriptLinks+=$(item).val();
        })
        }
        if(css!==""){
        css.forEach(function(item){
            cssLinks+=$(item).val();
        })
        }
        
       $("#output").attr("srcdoc","<!DOCTYPE html><html><head>"+cssLinks+scriptLinks+"<style>"+ecss.getValue("\n")+"</style></head> <body> "+ehtml.getValue("\n")+"<script>"+ejs.getValue("\n")+"<"+"/script></body></html>");
    })
    

   $(".dark-theme").on("click",function(){
        $("#dark-theme").toggleClass("far fa-square");
        $("#dark-theme").toggleClass("fas fa-check-square");
        (isDarkTheme)? isDarkTheme=false: isDarkTheme=true;
        if(isDarkTheme){
            ehtml.setTheme("ace/theme/monokai");
            ecss.setTheme("ace/theme/monokai");
            ejs.setTheme("ace/theme/monokai");
         }
        else{
            ehtml.setTheme("ace/theme/sqlserver");
            ecss.setTheme("ace/theme/tomorrow");
            ejs.setTheme("ace/theme/tomorrow");
        }
        $("#overlay").trigger("click");
    });
    
    $(".type-sel").click(function(){
        $(".type-sel").children("i").addClass("far fa-circle").removeClass("fas fa-check-circle");
        $(this).children("i").toggleClass("far fa-circle").toggleClass("fas fa-check-circle");
    })
    
    $("#inp-err").hide();
    
    $("#res-path").on("input",function(){
        if($(this).val()===""){
            $("#inp-err").show();
        }
        else{
            $("#inp-err").hide();
        }
    })
    
    $("#add-res-btn").click(function(){
        var link = $("#res-path").val();
        var mode = $("i.fas.fa-check-circle").parent("span.type-sel").text();
        if(link!==''){
        switch(mode){
            case " script":
             $(".script").append($(`<span class='script-links'><input type='text' value='&lt;script src="${link}"&gt;&lt;/script&gt;' class='sLink'><button class='s-cls'>&times;</button></span>`));
             break;
             
             case " stylesheet":
             $(".stylesheet").append($(`<span class='css-links'><input type='text' value='&lt;link rel="stylesheet" href="${link}"&gt;' class='cLink'><button class='c-cls'>&times;</button></span>`));
             break;
        }
        }
        else{
            $("#inp-err").show();
        }
        $("#res-path").val("");
        $(".s-cls,.c-cls").on("click",function(){
        $(this).parent().remove();
    })
    })
    
    var left = Math.floor((window.innerWidth - parseInt($("#add-res").css("width")))/2);
    var top =  Math.floor((window.innerHeight - parseInt($("#add-res").css("height")))/2);
    
    $("#add-res").css({"left":`${left}px`,"top":`${top}px`});
    
    
    left = Math.floor((window.innerWidth - parseInt($("#font-size").css("width")))/2);
        
    top = Math.floor((window.innerHeight - parseInt($("#font-size").css("height")))/2);
    
    $("#font-size").css({"left":`${left}px`,"top":`${top}px`});
    
    
    var popup=false;
    
    $("#add-resource").click(function(){
       if(!popup){
        $("#add-res").show();
        $("#opt-item").hide();
        popup = true;
        $("#overlay").css({"background":"rgba(0,0,0,0.3)"});
        }
    })
    
    $("#arf-btn").click(function(){
        $("#add-res").hide();
        popup = false;
        $("#overlay").trigger("click");
         $("#overlay").css({"background":"transparent"});
         $("#inp-err").hide();
    })
    
    $("#f-size").click(function(){
        if(!popup){
            $("#font-size").show();
            $("#opt-item").hide();
            popup = true;
        $("#overlay").css({"background":"rgba(0,0,0,0.3)"});
        }
    })
    
    $("#fs-btn").click(function(){
        $("#font-size").hide();
        popup = false;
        $("#overlay").trigger("click");
         $("#overlay").css({"background":"transparent"});
    })
    
    $("#fs").on("input",function(){
        var ind = $("#font-size-ind");
        var width = 33.333*($(this).val()-8);
        width-=((width/33.333)*1.75);
        ind.css({"width":`${width}px`});
        $("#samp-fv").text("Font-size: "+$(this).val()+"pt");
        $("#samp-fv").css({"font-size":$(this).val()+"pt"});
        ehtml.setOption("fontSize",$(this).val()+"pt");
        ecss.setOption("fontSize",$(this).val()+"pt");
        ejs.setOption("fontSize",$(this).val()+"pt");
    })
    
    $("#fs").trigger("input");
    
    
    $("#code-settings").click(function(){
        $("#overlay").trigger("click");
        $(".code-settings").animate({left:"0%"},500);
    })
    
    $("#sett-back-btn").click(function(){
        $(".code-settings").animate({left:"100%"},500);
    })
    
    
    $("#reset-code").click(function(){
        currEditor.session.setValue("");
        $("#overlay").trigger("click");
        updateBtn();
    })
    
    $("#reset-code-all").click(function(){
        ehtml.session.setValue("");
        ecss.session.setValue("");
        ejs.session.setValue("");
        $("#overlay").trigger("click");
        updateBtn();
    })
    
})