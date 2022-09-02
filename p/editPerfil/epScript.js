function setDU() {
    qs("#epName").value = dataUser.name;
    qs("#epDn").value = dataUser.ncm;
    qs("#slGene").value = dataUser.gene;
}

function applyAP() {
    let confirmAP = confirm("Tem certeza que quer alterar suas informações no aplicativo?");
    if (confirmAP) {
        if (qs("#epName").value != dataUser.name) {
            dataUser.name = qs("#epName").value;
        }
        if (qs("#epDn").value != dataUser.ncm) {
            dataUser.ncm = qs("#epDn").value;
        }
        if (qs("#slGene").value != dataUser.gene) {
            dataUser.gene = qs("#slGene").value;
        }
        updateLS();
        window.open("../conta/contaPag.html", "dpl");
    }
}

function discartAP() {
    window.open("../conta/contaPag.html", "dpl");
}

setDU();