document.getElementById("generateButton").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value.trim();
    const passwordLength = document.getElementById("passwordLength").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const includeAtSymbol = document.getElementById("includeAtSymbol").checked;
    const includeDollarSymbol = document.getElementById("includeDollarSymbol").checked;
    const includePercentSymbol = document.getElementById("includePercentSymbol").checked;
    const includeLowercase = document.getElementById("includeLowercase").checked;

    if (inputText === "") {
        alert("Поле введення тексту не може бути порожнім. Будь ласка, введіть текст.");
        return;
    }
    
    const transliterated = transliterate(inputText);
    const password = generatePassword(transliterated, passwordLength, includeUppercase, includeNumbers, includeSymbols, includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeLowercase);
    document.getElementById("outputPassword").value = password;
});

const checkboxUppercase = document.getElementById('includeUppercase');
const checkboxLowercase = document.getElementById('includeLowercase');

function toggleCheckboxes() {
  if (!checkboxUppercase.checked) {
    checkboxLowercase.disabled = true;
  } else {
    checkboxLowercase.disabled = false;
  }

  if (!checkboxLowercase.checked) {
    checkboxUppercase.disabled = true;
  } else {
    checkboxUppercase.disabled = false;
  }
}

checkboxUppercase.addEventListener('change', toggleCheckboxes);
checkboxLowercase.addEventListener('change', toggleCheckboxes);
toggleCheckboxes();

document.getElementById("inputText").addEventListener("input", function() {
    const inputText = this.value.trim();
    const transliteratedText = transliterate(inputText);
    const passwordLength = transliteratedText.length;

    document.getElementById("passwordLength").value = passwordLength;
    document.getElementById("lengthValue").textContent = passwordLength;
});

document.getElementById("passwordLength").addEventListener("input", function() {
    document.getElementById("lengthValue").textContent = this.value;
});

// Дропдаун меню для вибору символів
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.toggleSymbols') && !event.target.closest('.dropdown-content')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Функції
function transliterate(text) {
    const transliterationMap = {
        "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "є": "ie", "ж": "zh",
        "з": "z", "и": "y", "і": "i", "ї": "yi", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", 
        "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
        "ч": "ch", "ш": "sh", "щ": "shch", "ю": "yu", "я": "ya",
        "А": "A", "Б": "B", "В": "V", "Г": "G", "Ґ": "G", "Д": "D", "Е": "E", "Є": "IE", "Ж": "ZH",
        "З": "Z", "И": "Y", "І": "I", "Ї": "YI", "Й": "I", "К": "K", "Л": "L", "М": "M", "Н": "N",
        "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "H", "Ц": "TS",
        "Ч": "CH", "Ш": "SH", "Щ": "SHCH", "Ю": "YU", "Я": "YA"
    };
    return text.split("").map(char => transliterationMap[char] || char).join("");
}

function generatePassword(transliterated, length, includeUppercase, includeNumbers, includeSymbols, includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeLowercase) {
    const replacementsNumbers = {
        "z": "3", "i": "1", "o": "0", "s": "5", "ch": "4", "sh": "w",
        "Z": "3", "I": "1", "O": "0", "S": "5", "CH": "4", "SH": "W",
    };
    const replacementsSymbols = {};
    
    // Враховуємо вибір символів
    if (includeAtSymbol) {
        replacementsSymbols["a"] = "@";
        replacementsSymbols["A"] = "@";
    }
    if (includeDollarSymbol) {
        replacementsSymbols["s"] = "$";
        replacementsSymbols["S"] = "$";
    }
    if (includePercentSymbol) {
        replacementsSymbols["f"] = "%";
        replacementsSymbols["F"] = "%";
    }

    const spaceReplacements = [".", "-", "_"];

    let password = '';
    let skipNext = false;

    for (let i = 0; i < transliterated.length && password.length < length; i++) {
        let char = transliterated[i];

        // Пропускаємо обробку наступного символу, якщо вже обробляли парні літери (ch або sh)
        if (skipNext) {
            skipNext = false;
            continue;
        }

        let nextChar = transliterated[i + 1] || '';
        let randomNumber = Math.random();

        // Обробка "ch" або "sh"
        if (char === 'c' && nextChar === 'h' && randomNumber < 0.5 && includeNumbers) {
            password += '4';
            skipNext = true;
        } else if (char === 'C' && nextChar === 'H' && randomNumber < 0.5 && includeNumbers) {
            password += '4';
            skipNext = true;
        } else if (char === 's' && nextChar === 'h' && randomNumber < 0.5 && includeNumbers) {
            password += 'w';
            skipNext = true;
        } else if (char === 'S' && nextChar === 'H' && randomNumber < 0.5 && includeNumbers) {
            password += 'W';
            skipNext = true;
        } else if (char === " ") {
            password += spaceReplacements[Math.floor(Math.random() * spaceReplacements.length)];
        } else if (includeNumbers && replacementsNumbers[char] && randomNumber < 0.5) {
            password += replacementsNumbers[char];
        } else if (includeSymbols && replacementsSymbols[char] && randomNumber > 0.65) {
            password += replacementsSymbols[char];
        } else {
            if (includeLowercase && !includeUppercase) {
                password += char.toLowerCase();
            } else if (includeUppercase && !includeLowercase) {
                password += char.toUpperCase();
            } else {
                password += char;
            }
        }
    }

    // Доповнення символів до пароля, при необхідності
    if (password.length < length) {
        while (password.length < length) {
            let randomChar = "";
            let randomNumber = Math.random();

            if (!includeUppercase && !includeNumbers && !includeSymbols) {
                randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            } else if (includeSymbols && randomNumber > 0.75) {
                const symbols = Object.values(replacementsSymbols);
                randomChar = symbols[Math.floor(Math.random() * symbols.length)];
            } else if (includeNumbers && randomNumber < 0.25) {
                randomChar = Math.floor(Math.random() * 10).toString();
            } else {
                randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            }
            password += randomChar;
        }
    }

    if (includeUppercase && password.length > 0) {
        let firstLetter = password[0].toUpperCase();
        let lastLetter = password.slice(-1).toUpperCase();
        let middleSection = password.slice(1, -1);

        password = firstLetter + middleSection + lastLetter;
    }    

    return password;
}


// Копіювання пароля
document.getElementById("copyButton").addEventListener("click", function() {
    const passwordField = document.getElementById("outputPassword");
    passwordField.select();
    passwordField.setSelectionRange(0, 99999);
    document.execCommand("copy");
});
