//const { saveAs } = require("../../js/FileSaver");

function tickUser() {
    qs("nomeUser").innerHTML = dataUser.name;
    qs("dtUser > i").innerHTML = dataUser.ncm;
    qs("generoUser").innerHTML = dataUser.gene;

}

qs("#impPfl").addEventListener('change', function() {
    importAccount();
});

function exportAccount() {
    let blob = new Blob([JSON.stringify(dataUser)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, String(dataUser.name).replaceAll(" ", "") + ".vpnp");
}

tickUser();
tickTheme();