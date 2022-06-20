const dropdownMUType = document.querySelector("select.select--mu-group");
const dropdownMUSource = document.querySelector("select.select--mu-source");
const dropdownMUTarget = document.querySelector("select.select--mu-target");

/**
 * Заполняет выпадающие списки
 */
function fillUpDropdowns() {
    for (let i = dropdownMUType.length - 1; i >= 0; i -= 1) {
        dropdownMUType[i].remove();
    }

    for (const k of Object.entries(typesMU)) {
        let option = document.createElement("option");
        option.value = k[0];
        option.innerHTML = k[1];
        dropdownMUType.append(option);
    }
}

// типы единиц измерений
const typesMU = { temperature: "Температура", etc: "Дальше - больше..." };

//
const unitsTemp = ["Цельсий", "Фаренгейт", "Кельвин"];

/**
 * Коэффициенты формулы для перевода единиц измерения,
 * формула:
 * target = (kMult / kDiv) * (source + bPar) + bMain
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
