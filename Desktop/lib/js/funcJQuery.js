html = ace.edit("html")
css = ace.edit("css")
javascript = ace.edit("javascript")

$("#btn-html").click( function () {
    $('#preview').hide()
    $('#hp-preview-pane').hide()
    w3.show("#html")
    w3.hide("#css")
    w3.hide("#javascript")
    $(this).addClass("w3-theme-action")
    $("#btn-css").removeClass("w3-theme-action")
    $("#btn-javascript").removeClass("w3-theme-action")
})
$("#btn-css").click( function () {
    $('#preview').hide()
    $('#hp-preview-pane').hide()
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
    $('#hp-preview-pane').hide()
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
    $('#hp-preview-pane').show()
    $("#preview").attr("srcdoc", window.hpBuildPreview());
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

// Exibe nomes de projetos como texto, sem interpretar HTML ou JavaScript.
function createProjectAction(iconClass, colorClass, title, callback) {
    var button = document.createElement("button");
    button.type = "button";
    button.classList.add("w3-small", "w3-tag", "w3-round", colorClass, "w3-button");
    button.title = title;
    button.setAttribute("aria-label", title);

    var icon = document.createElement("i");
    icon.className = iconClass;
    icon.setAttribute("aria-hidden", "true");
    button.appendChild(icon);

    button.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();
        callback();
    });
    return button;
}

// Explorador de projetos: nomes sempre tratados como texto, nunca como HTML.
function loadProjects() {
    var root = document.getElementById("savedProjects");
    var projects = JSON.parse(localStorage.getItem("htmlpad") || "[]");
    var search = document.getElementById("hp-project-search");
    var query = search ? search.value.trim().toLocaleLowerCase() : "";
    var count = document.getElementById("hp-project-count");
    if (count) count.textContent = String(projects.length);
    var expanded = new Set(Array.from(root.querySelectorAll(".hp-project-folder[open]")).map(function(el) { return el.dataset.projectIndex; }));
    root.replaceChildren();

    var shown = 0;
    projects.forEach(function(project, index) {
        var projectName = String(project.projeto || "");
        if (query && !projectName.toLocaleLowerCase().includes(query)) return;
        shown++;
        var folder = document.createElement("details");
        folder.className = "hp-project-folder";
        folder.dataset.projectIndex = String(index);
        folder.open = expanded.has(String(index));

        var header = document.createElement("summary");
        header.className = "hp-folder-header";
        var chevron = document.createElement("i");
        chevron.className = "fa-solid fa-chevron-right hp-chevron";
        var icon = document.createElement("i");
        icon.className = "fa-solid fa-folder hp-folder-icon";
        var label = document.createElement("span");
        label.className = "hp-folder-name";
        label.textContent = projectName;
        label.title = projectName;
        header.append(chevron, icon, label);

        var menu = document.createElement("details");
        menu.className = "hp-project-menu";
        var menuToggle = document.createElement("summary");
        menuToggle.className = "hp-menu-trigger";
        menuToggle.title = "Ações do projeto";
        menuToggle.setAttribute("aria-label", "Ações de " + projectName);
        var dots = document.createElement("i");
        dots.className = "fa-solid fa-ellipsis-vertical";
        menuToggle.appendChild(dots);
        menuToggle.addEventListener("click", function(e) { e.stopPropagation(); });
        menu.appendChild(menuToggle);
        var actions = document.createElement("div");
        actions.className = "hp-menu-actions";
        function action(text, iconName, callback) {
            var button = document.createElement("button");
            button.type = "button";
            var ico = document.createElement("i");
            ico.className = "fa-solid " + iconName;
            button.append(ico, document.createTextNode(" " + text));
            button.addEventListener("click", function(e) {
                e.stopPropagation();
                menu.open = false;
                callback();
            });
            actions.appendChild(button);
        }
        action("Abrir", "fa-folder-open", function() { loadProject(index); });
        action("Renomear", "fa-pen", function() { renameProject(index); });
        action("Baixar ZIP", "fa-download", function() { downloadProject(index); });
        action("Excluir", "fa-trash", function() { deleteProject(index); });
        menu.appendChild(actions);
        menu.addEventListener("click", function(e) { e.stopPropagation(); });
        header.appendChild(menu);
        folder.appendChild(header);

        var files = document.createElement("div");
        files.className = "hp-project-files";
        [
            ["index.html", "html", "fa-brands fa-html5", "hp-html-icon"],
            ["style.css", "css", "fa-brands fa-css3-alt", "hp-css-icon"],
            ["script.js", "javascript", "fa-brands fa-js", "hp-js-icon"]
        ].forEach(function(file) {
            var button = document.createElement("button");
            button.type = "button";
            button.className = "hp-file-entry";
            var fileIcon = document.createElement("i");
            fileIcon.className = file[2] + " " + file[3];
            button.append(fileIcon, document.createTextNode(file[0]));
            button.addEventListener("click", function() {
                Promise.resolve(loadProject(index)).then(function(opened){
                    if(!opened)return;
                    document.getElementById("btn-" + file[1]).click();
                    if (window.innerWidth <= 992 && typeof w3_close === "function") w3_close();
                });
            });
            files.appendChild(button);
        });
        folder.appendChild(files);
        root.appendChild(folder);
    });
    if (!shown) {
        var empty = document.createElement("p");
        empty.className = "hp-empty-projects";
        empty.textContent = query ? "Nenhum projeto encontrado." : "Nenhum projeto salvo ainda.";
        root.appendChild(empty);
    }
}
document.getElementById("hp-project-search")?.addEventListener("input", loadProjects);
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
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/24/site/2/bloco/6',
            divClass: '.adMax1'
        },
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/24/site/2/bloco/4',
            divClass: '.adMax2'
        },
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/24/site/2/bloco/5',
            divClass: '.adMax3'
        },
        {
            url: 'https://api.thetapejara.com.br/api/adssites/usuario/24/site/2/bloco/7',
            divClass: '.interAds'
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
