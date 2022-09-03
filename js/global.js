let dataUser = null;

// VARIAVEIS

//let selectVac = false;
const qs = (e) => { return document.querySelector(e); };
let isApresent = false;
let isPag = "null";
let selectIsActive = false;
let selectId = null;
let selectData = {
    "name": qs("#SVTXTname"),
    "icon": qs("#SVTXTicon"),
    "desc": qs("#SVTXTdesc"),
    "data": qs("#SVTXTdata")
};

const date = () => { var d = new Date(); return d };
let checkDesc = (d) => {
    if (d == "") {
        return "<i>Sem Descrição</i>";
    } else {
        return d;
    }
};

// FOI MUITO LEGAL CRIAR TUDO ISSO, COM OS CÓDIGOS E TALS :D

let setIcon = (type) => {
    if (type == "tvApliced") {
        return "event_available";
    } else if (type == "tvPass") {
        return "event_busy";
    } else if (type == "tvProximo") {
        return "date_range";
    } else if (type == "tvWaiting") {
        return "event";
    }
};

/*function checkNewUser() {
    let ldb = localStorage.getItem("VPNaccount");
    let lnu = localStorage.getItem("VPNnewUser");
    if (ldb == null || ldb == "null" || ldb == "") {
        if (lnu == null || lnu == "" || lnu == "true" || lnu == true) {
            localStorage.setItem("VPNnewUser", false);
            window.open("../../pAst/indexAst.html", "_top");
        }
    } else {
        dataUser = JSON.parse(localStorage.getItem("VPNaccount"));
        localStorage.setItem("VPNnewUser") = false;
    }
}*/

function checkNewUser() {
    let ldb = localStorage.getItem("VPNaccount");
    let lnu = localStorage.getItem("VPNnewUser");
    if (lnu == null && ldb == null) {
        localStorage.setItem("VPNnewUser", true);
        window.open("../../pAst/indexAst.html", "_top");
    } else {
        dataUser = JSON.parse(localStorage.getItem("VPNaccount"));
        tickTheme();
    }
}

// FUNCTIONS //

function tickTable() {
    updateLS();
    tickTheme();
    let agTb = qs(".vacListSlots > td > ul");
    let model = (i) => {
        return "<a class='select' onclick='startSelect(\"" + dataUser.dataCst[dataUser.consultas[i]].id + "\")'><li id='vacItem' class='" + checkTimeVacina(dataUser.dataCst[dataUser.consultas[i]].dtNum, dataUser.dataCst[dataUser.consultas[i]].apply) + "' ><div class='iconVac'><span class='material-icons whiteTh thTxt' style='font-size: 3em;'>" + setIcon(checkTimeVacina(dataUser.dataCst[dataUser.consultas[i]].dtNum, dataUser.dataCst[dataUser.consultas[i]].apply)) + "</span></div><div><h3 class='whiteTh thTxt'>" + dataUser.dataCst[dataUser.consultas[i]].name + "</h3><p class='whiteTh thTxt'><i>" + dataUser.dataCst[dataUser.consultas[i]].data + "</i></p><br><span class='whiteTh thTxt'>" + dataUser.dataCst[dataUser.consultas[i]].desc + "</span></div></li></a>";
    }
    agTb.innerHTML = "";
    for (let i = (dataUser.consultas.length - 1); i > -1; i--) {
        switch (isPag) {
            case "pVt":
                console.log(
                    [
                        String(dataUser.consultas[i]).apply,
                        String(dataUser.consultas[i]),
                        dataUser.consultas[i].apply,
                        i, dataUser.consultas[i]
                    ])
                if (dataUser.dataCst[String(dataUser.consultas[i])].apply) { agTb.innerHTML += model(i); }
                break;
            case "pVa":
                if (!dataUser.dataCst[dataUser.consultas[i]].apply) { agTb.innerHTML += model(i); }
                break;
        }
    }
}

function addConsuta(name, data, desc, dataNum) {
    var preid = generateId();
    dataUser.consultas.push(preid);

    //Json
    let v = {
        "name": name,
        "data": data,
        "desc": checkDesc(desc),
        "id": preid,
        "dtNum": String(dataNum),
        "apply": false
    }
    dataUser.dataCst[preid] = v;
}

// FUNÇÕES BASES //

function updateLS() {
    localStorage.setItem("VPNaccount", JSON.stringify(dataUser));
}

function checkTimeVacina(time, apply) {
    let timeDt = new Date(Number(time));
    if (apply == true) {
        return "tvApliced";
    } else {
        if (date() < timeDt) {
            if (date().setDate(date().getDate() + 6) > timeDt) {
                return "tvProximo";
            } else {
                return "tvWaiting";
            }
        } else {
            return "tvPass";
        }
    }
}

function generateId() {
    let gnrId = () => { return Math.random().toString(36).slice(2); };
    let id = gnrId();
    while (JSON.stringify(dataUser.consultas).replaceAll("\"", "'").search("'id':'" + String(id) + "'") != "-1") {
        id = gnrId();
    }
    return String(id);
}

// AÇÕES //

function searchIS(del) {
    let i = -1;
    while (dataUser.consultas[i] == del) {
        i++;
    }
    i++;
    return i;
}

function delVacina() {
    if (selectIsActive) {
        let accept = confirm("Tem certeza que quer deletar a vacina?\nNão tem como recuperar!");
        if (accept) {
            console.log(selectId);
            console.log(searchIS(selectId));
            dataUser.consultas.pop(searchIS(selectId));
            delete dataUser.dataCst[String(selectId)];
            startSelect(null);
            tickTable();
        }
    }
}

function resVacina() {
    if (selectIsActive) {
        dataUser.dataCst[selectId].apply = false;
        startSelect(null);
        tickTable();
    }
}

function startSelect(id) {
    selectIsActive = !selectIsActive;
    if (selectIsActive) {
        selectId = id;
        qs("#SVTXTname").innerText = dataUser.dataCst[id].name;
        qs("#SVTXTdesc").innerHTML = dataUser.dataCst[id].desc;
        qs("#SVTXTdata").innerText = dataUser.dataCst[id].data;
        qs("#SVTXTicon").innerText = setIcon(checkTimeVacina(dataUser.dataCst[id].dtNum));
        qs(".selectVacina").classList.replace("no-select", "select");
    } else {
        qs(".selectVacina").classList.replace("select", "no-select");
    }
}

function resetAccount() {
    if (confirm("Tem certeza que quer limpar os seus dados?")) {
        /*dataUser = {
            "name": "Sem Nome",
            "ncm": "2000-01-01",
            "gene": "masculino",
            "dackTh": false,
            "consultas": [],
            "dataCst": {}
        }*/
        dataUser = null;
        localStorage.removeItem("VPNnewUser");
        localStorage.removeItem("VPNaccount");
        //updateLS();
        window.open('./contaPag.html', 'dpl');
    }
}

function setDarkTheme() {
    dataUser.dackTh = !dataUser.dackTh;
    //let type = () => { if (dataUser.dackTh) { return ["whiteTh", "darkTh"]; } else { return ["darkTh", "whiteTh"]; } };
    tickTheme();
}

function importAccount() {
    var file = new FileReader();
    file.onload = () => {
        if (confirm("Você tem certeza que quer importar essa conta?\nA conta atual será substituida e você perderá seus dados.")) {
            dataUser = JSON.parse(file.result);
            updateLS();
        }
    }
    file.readAsText(qs("#impPfl").files[0]);
    window.open('./contaPag.html', 'dpl');
}

function tickTheme() {
    let t = () => { if (dataUser.dackTh) { return ["whiteTh", "darkTh"]; } else { return ["darkTh", "whiteTh"]; } };
    updateLS();
    document.querySelectorAll("." + t()[0]).forEach((data) => { data.classList.replace(t()[0], t()[1]) })
}

// TICK FRAME 10s //

function tickSlotVac() {
    tickTable();
    setTimeout(() => {
        tickSlotVac();
        stop
    }, 10000)
}
checkNewUser();