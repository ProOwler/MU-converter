const dropdownMUType = document.querySelector("select.select--mu-group");
const dropdownMUSource = document.querySelector("select.select--mu-source");
const dropdownMUTarget = document.querySelector("select.select--mu-target");
const fieldSource = document.querySelector("#textfield-input");
const fieldTarget = document.querySelector("#textfield-output");
const buttonSwap = document.querySelector("button.btn-swap");

// типы единиц измерений
const typesMU = {
    temperature: "Температура",
    etc: "Дальше - больше...",
};

//
const unitsTemp = {
    celsius: "Цельсий",
    fahrenheit: "Фаренгейт",
    kelvin: "Кельвин",
};

/* Коэффициенты формулы для перевода единиц измерения,
 * формула:
 * target = (kMult / kDiv) * (source + bPar) + bMain
 * // y = k * x + b
 */
const convertMU = [
    {
        type: "temperature",
        source: "kelvin",
        target: "fahrenheit",
        kMult: 9,
        kDiv: 5,
        bPar: 0,
        bMain: -459.67,
    },
    {
        type: "temperature",
        source: "kelvin",
        target: "celsius",
        kMult: 1,
        kDiv: 1,
        bPar: 0,
        bMain: -273.15,
    },
    {
        type: "temperature",
        source: "celsius",
        target: "kelvin",
        kMult: 1,
        kDiv: 1,
        bPar: 0,
        bMain: 273.15,
    },
    {
        type: "temperature",
        source: "celsius",
        target: "fahrenheit",
        kMult: 9,
        kDiv: 5,
        bPar: 0,
        bMain: 32,
    },
    {
        type: "temperature",
        source: "fahrenheit",
        target: "kelvin",
        kMult: 5,
        kDiv: 9,
        bPar: 459.67,
        bMain: 0,
    },
    {
        type: "temperature",
        source: "fahrenheit",
        target: "celsius",
        kMult: 5,
        kDiv: 9,
        bPar: -32,
        bMain: 0,
    },
];

/* Заполняет выпадающие списки
 */
function fillUpDropdowns() {
    fillUpMUList(dropdownMUType, typesMU, "temperature");
    fillUpMUList(dropdownMUSource, unitsTemp, "fahrenheit");
    fillUpMUList(dropdownMUTarget, unitsTemp, "celsius");
}

function fillUpMUList(dropdown, elements, selected) {
    for (let i = dropdown.length - 1; i >= 0; i -= 1) {
        dropdown[i].remove();
    }

    for (const k of Object.entries(elements)) {
        let option = document.createElement("option");
        option.value = k[0];
        option.innerHTML = k[1];
        if (k[0] == selected) {
            option.selected = true;
        }
        dropdown.append(option);
    }
}

fillUpDropdowns();

function calculateConversion(source, sourceMU, targetMU, typeMU, codex) {
    if (sourceMU == targetMU) {
        return source;
    }
    let args = codex.find(
        (item) =>
            item["type"] == typeMU &&
            item["source"] == sourceMU &&
            item["target"] == targetMU
    );
    if (args == undefined) {
        return undefined;
    }
    let result =
        (args["kMult"] / args["kDiv"]) * (source + args["bPar"]) +
        args["bMain"];
    return Math.round(100 * result) / 100;
}

/* Функция-коллбэк, которая выполняется при возникновении события,
 * выполняет пересчёт и вывод данных
 */
function conversionEvent() {
    if (fieldSource.value == "") {
        fieldSource.value = 0;
    }
    let conversionResult = calculateConversion(
        Number(fieldSource.value),
        dropdownMUSource.value,
        dropdownMUTarget.value,
        dropdownMUType.value,
        convertMU
    );
    if (conversionResult == undefined) {
        fieldTarget.value = "";
        fieldSource.value = "";
    } else {
        fieldTarget.value = conversionResult;
    }
}

fieldSource.addEventListener("input", conversionEvent);

[dropdownMUSource, dropdownMUTarget, dropdownMUType].forEach((element) => {
    element.addEventListener("change", conversionEvent);
});

buttonSwap.addEventListener("click", (event) => {
    let selectedSource = dropdownMUSource.value;
    dropdownMUSource.value = dropdownMUTarget.value;
    dropdownMUTarget.value = selectedSource;
    conversionEvent();
});
