htmlpad = "HTMLPAD++"
versao = "<i>v2.9</i>"
document.querySelector("title").innerHTML = htmlpad + " " + versao
document.querySelector("#nomeApp").innerHTML = htmlpad + " " + versao

acc = document.getElementsByClassName("accordion")
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("ativado")
        panel = this.nextElementSibling
        if (panel.style.display === "block") {
            panel.style.display = "none"
        } else {
            panel.style.display = "block"
        }
    })
}

w3.includeHTML()