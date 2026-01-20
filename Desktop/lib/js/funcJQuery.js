html = ace.edit("html")
css = ace.edit("css")
javascript = ace.edit("javascript")

$("#btn-html").click( function () {
    $('#preview').hide()
    w3.show("#html")
    w3.hide("#css")
    w3.hide("#javascript")
    $(this).addClass("w3-theme-action")
    $("#btn-css").removeClass("w3-theme-action")
    $("#btn-javascript").removeClass("w3-theme-action")
})
$("#btn-css").click( function () {
    $('#preview').hide()
    w3.show("#css")
    w3.hide("#html")
    w3.hide("#javascript")
    $(this).addClass("w3-theme-action")
    $("#btn-html").removeClass("w3-theme-action")
    $("#btn-javascript").removeClass("w3-theme-action")
})
$("#btn-javascript").click( function () {
    w3.show("#javascript")
    $('#preview').hide()
    w3.hide("#html")
    w3.hide("#css")
    $(this).addClass("w3-theme-action")
    $("#btn-html").removeClass("w3-theme-action")
    $("#btn-css").removeClass("w3-theme-action")
})


$("#btn-preview").click(function() {
    $('#html').hide()
    $('#css').hide()
    $('#javascript').hide()
    $('#preview').show()
    $("#preview").attr("srcdoc", "<style>" + css.getValue("\n") + "</style>" + html.getValue("\n") + "<script>" + javascript.getValue("\n") + "<" + "/script>");
})
$("#btn-salvar").click( function () {
    var element = document.createElement('a');
    code = document.getElementById('preview').srcdoc;
    element.setAttribute('href', 'data:text/text;charset=utf-8,' + encodeURIComponent(code));
    element.setAttribute('download', "snippets.html");
    element.click();
})


// Função para salvar o projeto
function saveProject() {
    var projectName = prompt("Digite o nome do projeto:");
    if (projectName) {
        var projectData = {
            html: html.getValue("\n"),
            css: css.getValue("\n"),
            js: javascript.getValue("\n")
        };
        var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
        projects.push({ projeto: projectName, content: projectData });
        localStorage.setItem("htmlpad", JSON.stringify(projects));
        loadProjects();
    }
}

// Função para carregar os projetos salvos
function loadProjects() {
    var savedProjects = document.getElementById("savedProjects");
    savedProjects.innerHTML = "";
    var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
    projects.forEach(function(project) {
        var option = document.createElement("a");
        option.classList.add('w3-bar-item', 'w3-button', 'w3-padding');
        option.id = "project_" + project.projeto;
        option.href = "#project_" + project.projeto;
        option.onclick = function () {loadProject(project.projeto)};
        option.innerHTML = `
                            <span><i class="fa-solid fa-folder"></i> ${project.projeto} </span>
                            <span class="w3-right">
                                <span onclick="downloadProject('${project.projeto}')" class="w3-small w3-tag w3-round w3-blue"><i class="fa-solid fa-download"></i></span>
                                <span onclick="deleteProject('${project.projeto}')" class="w3-small w3-tag w3-round w3-red"><i class="fa-solid fa-trash"></i></span>
                            </span>
        `;
        savedProjects.appendChild(option);
    });
}
loadProjects()
// Função para carregar um projeto salvo
function loadProject(project) {
    var projectName = project
    if (projectName) {
        var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
        var projectData = projects.find(function(project) {
            return project.projeto === projectName;
        });
        if (projectData) {
            html.session.setValue(projectData.content.html);
            css.session.setValue(projectData.content.css);
            javascript.session.setValue(projectData.content.js);
        }
    }
}

// Função para excluir o projeto
function deleteProject(project) {
    var projectName = project;
    if (projectName && confirm("Tem certeza de que deseja excluir o projeto '" + projectName + "'?")) {
        var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
        projects = projects.filter(function(project) {
            return project.projeto !== projectName;
        });
        localStorage.setItem("htmlpad", JSON.stringify(projects));
        loadProjects();
    }
}

// Função para baixar o projeto
function downloadProject(project) {
    var projectName = project;
    if (projectName) {
        var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
        var projectData = projects.find(function(project) {
            return project.projeto === projectName;
        });
        if (projectData) {
            var zip = new JSZip();
            zip.file(projectName + ".json", JSON.stringify(projectData));
            zip.file("index.html", projectData.content.html || '');
            zip.file("style.css", projectData.content.css || '');
            zip.file("script.js", projectData.content.js || '');
            zip.generateAsync({type:"blob"})
                .then(function(content) {
                    saveAs(content, projectName + ".zip");
                });
        }
    }
}

setTimeout(() => {
    let blocked = false;

    if (typeof window.adsLoaded === "undefined") blocked = true;

    if (blocked) {
        $('body').append(`
            <div class="w3-modal" style="display:block;" id="modalAdBlock">
                <div class="w3-modal-content w3-animate-top">
                    <div class="w3-pale-yellow w3-text-yellow w3-padding w3-border w3-border-yellow w3-round w3-margin-bottom">
                        <strong>Atenção!</strong>
                        <span>Detectamos AdBlock. Apoie o site ❤️.</span>
                        <span class="w3-right w3-font-bold" onclick="$(\'#modalAdBlock\').hide()"><i class="fa-solid fa-xmark"></i></span
                    </div>
                </div>
            </div>
        `);
    }
}, 500);

//LUMAADS
$(document).ready(function() {
    // Função para realizar a requisição AJAX e atualizar a div com o conteúdo da resposta
    function ajax(url, divClass) {
        $.ajax({
            url: url,
            type: 'GET',
            success: function(response) {
            // Atualiza a div com o conteúdo da resposta
            $(divClass).html(response);
            }
        });
    }

// Função para carregar os anúncios
function loadAds() {
    // Array de URLs e classes de div correspondentes
    var urls = [
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/1/site/2/bloco/6',
            divClass: '.adMax1'
        },
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/1/site/2/bloco/4',
            divClass: '.adMax2'
        },
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/1/site/2/bloco/5',
            divClass: '.adMax3'
        }
        // Adicione mais objetos URL/divClass conforme necessário
    ];

    // Percorre o array de URLs e classes de div
    for (var i = 0; i < urls.length; i++) {
            var url = urls[i].url;
            var divClass = urls[i].divClass;

            // Chama a função ajax() para cada URL e classe de div correspondente
            ajax(url, divClass);
        }
    }

    // Função principal que é executada quando o documento estiver pronto
    $(document).ready(function() {
        // Chama a função loadAds() para carregar os anúncios
        loadAds();
    });
});
