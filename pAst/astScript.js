let ss = -1;

function nextSession() {
    ss += 1;
    for (var i = 0; i < 4; i++) {
        if (i == ss) {
            qs("#session" + i).style.display = "flex";
        } else {
            qs("#session" + i).style.display = "none";
        }
    }
}

function joinApp() {
    if (confirm("Deseja se cadastrar no aplicativo?")) {
        if (qs("#epName").value != "" && qs("#epDn").value != "" && qs("#epGene").value != "") {
            console.log(dataUser);
            dataUser = {
                "name": qs("#epName").value,
                "ncm": qs("#epDn").value,
                "gene": qs("#epGene").value,
                "dackTh": false,
                "consultas": [],
                "dataCst": {}
            }
            console.log(dataUser);
            updateLS();
            console.log(dataUser);
            localStorage.setItem("VPNnewUser", false);
            window.open("../index.html", "_top");
        } else {
            alert("Desculpe, mas parece que tem alguma informação faltando.")
        }
    }
}

function impAct() {
    var file = new FileReader();
    file.onload = () => {
        if (confirm("Você tem certeza que quer importar essa conta?\nA conta atual será substituida e você perderá seus dados.")) {
            dataUser = JSON.parse(file.result);
            updateLS();
        }
    }
    file.readAsText(qs("#btnImpotP").files[0]);
    localStorage.setItem("VPNnewUser", false);
    window.open('../index.html', '_top');
}

qs("#btnImpotP").addEventListener('change', function() { impAct() });

qs(".btnNext").addEventListener("click", nextSession());

//qs("#btnJoinApp").addEventListener("chance", joinApp())