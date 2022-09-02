isPag = "pVa";

// VATIAVEIS //

let _onAddingVacina = false;
let _btnActAddVac = qs("#actAddVac");

// FUNÇÕES // 

qs("#btnConfirmAddConsulte").addEventListener("click", function() {
    // Adicionando Vacina
    addConsuta(qs("#nameVacAdd").value, qs("#dataVacAdd").value, qs("#descVacAdd").value, qs("#dataVacAdd").valueAsNumber);

    // Clean
    qs("#nameVacAdd").value = "";
    qs("#dataVacAdd").value = "";
    qs("#descVacAdd").value = "";
    _onAddingVacina = false;
    _btnActAddVac.setAttribute("class", "bav_false");
    qs("#dateErro").setAttribute("class", "dateErrorfalse");

    tickTable();
});

_btnActAddVac.addEventListener("click", function() {
    _onAddingVacina = !_onAddingVacina;
    _btnActAddVac.setAttribute("class", "bav_" + _onAddingVacina);
    qs("#nameVacAdd").value = "";
    qs("#dataVacAdd").value = "";
    qs("#descVacAdd").value = "";
    qs("#dateErro").setAttribute("class", "dateErrorfalse")
});

qs("#dataVacAdd").addEventListener("change", (data) => {
    let dt = date().setDate(date().getDate() - 1) > data.srcElement.valueAsNumber;
    document.querySelector("#dateErro").setAttribute("class", "dateError" + dt)
    dt = "";
})

function applyVacina() {
    if (selectIsActive) {
        dataUser.dataCst[selectId].apply = true;
        startSelect(null);
        tickTable();
    }
}

tickSlotVac();