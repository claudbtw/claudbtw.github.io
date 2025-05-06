function updatePassword() {
    const inputText = document.getElementById("inputText").value.trim();
    const passwordLength = document.getElementById("passwordLength").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const includeSpaceReplacements = document.getElementById("includeSpaceReplacements").checked;

    // Стан вибору кожного символа
    const includeAtSymbol = document.getElementById("includeAtSymbol").checked;
    const includeDollarSymbol = document.getElementById("includeDollarSymbol").checked;
    const includePercentSymbol = document.getElementById("includePercentSymbol").checked;
    const includeW = document.getElementById("includeW").checked;
    const includeExclamationMark = document.getElementById("includeExclamationMark").checked;
    const includeHashTag = document.getElementById("includeHashTag").checked;

    // Стан вибору кожної цифри
    const includeZero = document.getElementById("includeZero").checked;
    const includeOne = document.getElementById("includeOne").checked;
    const includeThree = document.getElementById("includeThree").checked;
    const includeFour = document.getElementById("includeFour").checked;
    const includeFive = document.getElementById("includeFive").checked;
    const includeSix = document.getElementById("includeSix").checked;
    const includeSeven = document.getElementById("includeSeven").checked;
    const includeEight = document.getElementById("includeEight").checked;
    const includeNine = document.getElementById("includeNine").checked;

    // Стан вибору кожного символу-роздільника
    const includeDot = document.getElementById("includeDot").checked;
    const includeMinus = document.getElementById("includeMinus").checked;
    const includePlus = document.getElementById("includePlus").checked;
    const includeUnderscore = document.getElementById("includeUnderscore").checked;
    const includeColon = document.getElementById("includeColon").checked;
    const includeSemicolon = document.getElementById("includeSemicolon").checked;
    const includeSlash = document.getElementById("includeSlash").checked;
    const includeAmbersant = document.getElementById("includeAmbersant").checked;

    if (inputText === "") {
        document.getElementById("outputPassword").innerHTML = "";
        return;
    }

    const transliterated = transliterate(inputText);
    const password = generatePassword(
        transliterated, passwordLength, includeUppercase, includeSpaceReplacements, includeNumbers, includeSymbols,
        includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeW, includeExclamationMark, includeHashTag,
        includeZero, includeOne, includeThree, includeFour, includeFive, includeSix, includeSeven, includeEight, includeNine,
        includeDot, includeMinus, includePlus, includeUnderscore, includeColon, includeSemicolon, includeSlash, includeAmbersant
    );

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;
}

document.getElementById("generateButton").addEventListener("click", updatePassword);
document.getElementById("passwordLength").addEventListener("input", updatePassword);


["includeUppercase", "includeNumbers", "includeSymbols", "includeSpaceReplacements", "includeAtSymbol", "includeDollarSymbol", "includePercentSymbol", "includeW", 
    "includeExclamationMark", "includeHashTag", "includeZero", "includeOne", "includeThree", "includeFour", "includeFive", "includeSix", 
    "includeSeven", "includeEight", "includeNine", "includeDot", "includeMinus", "includePlus", "includeUnderscore", "includeColon", 
    "includeSemicolon", "includeSlash", "includeAmbersant" ].forEach(id => {
        document.getElementById(id).addEventListener("change", updatePassword);
});


document.getElementById('mneme-button').addEventListener('click', function () {
    window.location.href = 'second-generator.html';
});
document.getElementById('ukrainian-alike-button').addEventListener('click', function () {
    window.location.href = 'third-generator.html';
});
document.getElementById('random-button').addEventListener('click', function () {
    window.location.href = 'forth-generator.html';
});


// Функції транслітерації
function transliterate(text) {
    const transliterationMap = {
        "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "є": "ie", "ж": "zh",
        "з": "z", "и": "y", "і": "i", "ї": "yi", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", 
        "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
        "ч": "ch", "ш": "sh", "щ": "shch", "ю": "yu", "я": "ya", "ь": "'", "ы": "", "ъ": "", "э": "",
        "А": "A", "Б": "B", "В": "V", "Г": "G", "Ґ": "G", "Д": "D", "Е": "E", "Є": "IE", "Ж": "ZH",
        "З": "Z", "И": "Y", "І": "I", "Ї": "YI", "Й": "I", "К": "K", "Л": "L", "М": "M", "Н": "N",
        "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "H", "Ц": "TS",
        "Ч": "CH", "Ш": "SH", "Щ": "SHCH", "Ю": "YU", "Я": "YA", "Ь": "'", "Ы": "", "Ъ": "", "Э": ""
    };
    return text.split("").map(char => transliterationMap[char] || char).join("");
}

function generatePassword(transliterated, length, includeUppercase, includeSpaceReplacements, includeNumbers, includeSymbols,
                          includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeW, includeExclamationMark, includeHashTag,
                          includeZero, includeOne, includeThree, includeFour, includeFive, includeSix, includeSeven, includeEight, includeNine,
                          includeDot, includeMinus, includePlus, includeUnderscore, includeColon, includeSemicolon, includeSlash, includeAmbersant) {
    const replacementsNumbers = {};
    const replacementsSymbols = {};
    const spaceReplacements = [];

    // Вибір цифр
    if (includeZero) replacementsNumbers["o"] = replacementsNumbers["O"] = "0";
    if (includeOne) replacementsNumbers["i"] = replacementsNumbers["I"] = "1";
    if (includeThree) replacementsNumbers["z"] = replacementsNumbers["Z"] = "3";
    if (includeFour) replacementsNumbers["ch"] = replacementsNumbers["CH"] = "4";
    if (includeFive) replacementsNumbers["s"] = replacementsNumbers["S"] = "5";
    if (includeSix) replacementsNumbers["b"] = replacementsNumbers["B"] = "6";
    if (includeSeven) replacementsNumbers["t"] = replacementsNumbers["T"] = "7";
    if (includeEight) replacementsNumbers["v"] = replacementsNumbers["V"] = "8";
    if (includeNine) replacementsNumbers["ya"] = replacementsNumbers["YA"] = "9";
    
    // Вибір символів
    if (includeAtSymbol) replacementsSymbols["a"] = replacementsSymbols["A"] = "@";
    if (includeDollarSymbol) replacementsSymbols["s"] = replacementsSymbols["S"] = "$";
    if (includePercentSymbol) replacementsSymbols["f"] = replacementsSymbols["F"] = "%";
    if (includeW) replacementsSymbols["sh"] = "w", replacementsSymbols["SH"] = "W";
    if (includeExclamationMark) replacementsSymbols["i"] = replacementsSymbols["I"] = "!";
    if (includeHashTag) replacementsSymbols["n"] = replacementsSymbols["N"] = "#";
    
    // Вибір символів-роздільників
    if (includeDot) spaceReplacements.push(".");
    if (includeMinus) spaceReplacements.push("-");
    if (includeUnderscore) spaceReplacements.push("_");
    if (includeColon) spaceReplacements.push(":");
    if (includeSemicolon) spaceReplacements.push(";");
    if (includeSlash) spaceReplacements.push("/");
    if (includeAmbersant) spaceReplacements.push("&");
    if (includePlus) spaceReplacements.push("+");

    let password = "";
    let i = 0;
    
    const randomArray = new Uint8Array(1); 

    while (i < transliterated.length && password.length < length) {
        let char = transliterated[i];
        let nextChar = transliterated[i + 1] || "";
        let nextNextChar = transliterated[i + 2] || "";
        let nextNextNextChar = transliterated[i + 3] || "";
        
        crypto.getRandomValues(randomArray); 
        let randomNumber = randomArray[0] / 255;

        if ((char + nextChar + nextNextChar + nextNextNextChar).toLowerCase() === "shch") {
            password += "shch";
            i += 4;
            continue;
        }

        if ((char + nextChar).toLowerCase() === "ch" && includeNumbers && replacementsNumbers["ch"] && randomNumber > 0.6) {
            password += replacementsNumbers["ch"];
            i += 2;
            continue;
        }
        if ((char + nextChar).toLowerCase() === "sh" && includeSymbols && replacementsSymbols["sh"] && randomNumber > 0.6) {
            password += replacementsSymbols["sh"];
            i += 2;
            continue;
        }
        if ((char + nextChar).toLowerCase() === "ya" && includeSymbols && replacementsSymbols["ya"] && randomNumber > 0.6) {
            password += replacementsSymbols["ya"];
            i += 2;
            continue;
        }

        if (char === " " && !includeSpaceReplacements) {
            i++;
            continue;
        }
        if (char === " " && includeSpaceReplacements) {
            password += spaceReplacements[Math.floor(randomNumber * spaceReplacements.length)];
            i++;
            continue;
        }
        if (includeNumbers && replacementsNumbers[char] && randomNumber < 0.34) {
            password += replacementsNumbers[char];
        } else if (includeSymbols && replacementsSymbols[char] && randomNumber > 0.66) {
            password += replacementsSymbols[char];
        } else if (!includeUppercase) {
            password += char.toLowerCase();
        } else {
            password += char;
        }
        i++;
    }

    if (includeUppercase && password.length > 0) {
        let words = password.split(' ');
    
        if (words.length === 1) {
            if (password.length === 1) {
                password = password.toUpperCase();
            } else {
                let firstLetter = password[0].toUpperCase();
                let lastLetter = password.slice(-1).toUpperCase();
                let middleSection = password.slice(1, -1);
    
                password = firstLetter + middleSection + lastLetter;
            }
        } else {
            password = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
    }
    
    return password;
}









document.addEventListener("DOMContentLoaded", function () {
    const hideButton = document.querySelector(".hide-settings-button");
    const settingsBox = document.querySelector(".settings-box-wrap");
    const arrowIcon = document.querySelector(".arrow-down-svg");

    hideButton.addEventListener("click", function () {
        settingsBox.classList.toggle("hidden");

        arrowIcon.classList.toggle("rotate");
    });
});

document.getElementById("copyButton").addEventListener("click", function() {
    const password = document.getElementById('outputPassword').innerText;

    if (!password) {
        alert("Пароль не згенеровано.");
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        alert("Пароль успішно скопійовано!");
    })
});

// Виключення/включення чекбоксів
function handleCheckboxGroup(majorCheckboxId, minorCheckboxSelector) {
    const majorCheckbox = document.getElementById(majorCheckboxId);
    const minorCheckboxes = document.querySelectorAll(minorCheckboxSelector);

    majorCheckbox.addEventListener("change", function () {
        const isChecked = this.checked;
        minorCheckboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
        });
    });

    minorCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", function () {
            const anyChecked = Array.from(minorCheckboxes).some(checkbox => checkbox.checked);
            majorCheckbox.checked = anyChecked;
        });
    });
}

handleCheckboxGroup("includeNumbers", ".numbers-dropdown-content input[type='checkbox']");
handleCheckboxGroup("includeSymbols", ".symbols-dropdown-content input[type='checkbox']");
handleCheckboxGroup("includeSpaceReplacements", ".space-dropdown-content input[type='checkbox']");


// Дропдаун меню
function toggleNumbersDropdown() {
    document.getElementById("numbers-dropdown-content").classList.toggle("showNumbers");
}
function toggleSymbolsDropdown() {
  document.getElementById("symbols-dropdown-content").classList.toggle("showSymbols");
}
function toggleSpaceDropdown() {
    document.getElementById("space-dropdown-content").classList.toggle("showSpaceReplacements");
}

window.onclick = function(event) {
    if (!event.target.matches(".toggleNumbers") && !event.target.closest(".numbers-dropdown-content")) {
        let numbersDropdowns = document.getElementsByClassName("numbers-dropdown-content");
        for (let i = 0; i < numbersDropdowns.length; i++) {
            let openNumbersDropdown = numbersDropdowns[i];
            if (openNumbersDropdown.classList.contains("showNumbers")) {
                openNumbersDropdown.classList.remove("showNumbers");
            }
        }
    }
    if (!event.target.matches(".toggleSymbols") && !event.target.closest(".symbols-dropdown-content")) {
        let symbolsDropdowns = document.getElementsByClassName("symbols-dropdown-content");
        for (let i = 0; i < symbolsDropdowns.length; i++) {
            let openSymbolsDropdown = symbolsDropdowns[i];
            if (openSymbolsDropdown.classList.contains("showSymbols")) {
                openSymbolsDropdown.classList.remove("showSymbols");
            }
        }
    }
    if (!event.target.matches(".toggleSpaceReplacements") && !event.target.closest(".space-dropdown-content")) {
        let spaceDropdowns = document.getElementsByClassName("space-dropdown-content");
        for (let i = 0; i < spaceDropdowns.length; i++) {
            let openSpacesDropdown = spaceDropdowns[i];
            if (openSpacesDropdown.classList.contains("showSpaceReplacements")) {
                openSpacesDropdown.classList.remove("showSpaceReplacements");
            }
        }
    }
};


















let defaultOptions = {
    includeNumbers: true,
    includeSymbols: true,
    includeSpaceReplacements: true,

    includeZero: true,
    includeOne: true,
    includeThree: true,
    includeFour: true,
    includeFive: true,
    includeSix: true,
    includeSeven: true,
    includeEight: true,
    includeNine: true,

    includeAtSymbol: true,
    includeDollarSymbol: true,
    includePercentSymbol: true,
    includeW: true,
    includeExclamationMark: true,
    includeHashTag: true,
    
    includeDot: true,
    includeMinus: true,
    includePlus: true,
    includeUnderscore: true,
    includeColon: true,
    includeSemicolon: true,
    includeSlash: true,
    includeAmbersant: true
};

function updateCheckboxValues() {
    document.querySelectorAll("input.password-option[type=checkbox]").forEach(checkbox => {
        defaultOptions[checkbox.id] = checkbox.checked;
    });

    function uncheckOptions(mainId, subIds) {
        let mainCheckbox = document.getElementById(mainId);
        if (mainCheckbox.checked) {
            mainCheckbox.checked = false;
            mainCheckbox.dispatchEvent(new Event("change"));
        }
    
        subIds.forEach(id => {
            let checkbox = document.getElementById(id);
            if (checkbox.checked) {
                checkbox.checked = false;
                checkbox.dispatchEvent(new Event("change"));
            }
        });
    }
    
    if (!defaultOptions.includeNumbers) {
        uncheckOptions("includeNumbers", [
            "includeZero", "includeOne", "includeThree", "includeFour", 
            "includeFive", "includeSix", "includeSeven", "includeEight", "includeNine"
        ]);
    }
    
    if (!defaultOptions.includeSymbols) {
        uncheckOptions("includeSymbols", [
            "includeAtSymbol", "includeDollarSymbol", "includePercentSymbol", 
            "includeW", "includeExclamationMark", "includeHashTag"
        ]);
    }
    
    if (!defaultOptions.includeSpaceReplacements) {
        uncheckOptions("includeSpaceReplacements", [
            "includeDot", "includeMinus", "includePlus", "includeUnderscore", 
            "includeColon", "includeSemicolon", "includeSlash", "includeAmbersant"
        ]);
    }
    

    recalculateStrength();
}


["includeNumbers", "includeSymbols", "includeSpaceReplacements"].forEach(id => {
    document.getElementById(id).addEventListener("change", updateCheckboxValues);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input.password-option[type=checkbox]").forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            updateCheckboxValues();
        });
    });
});

function recalculateStrength() {
    const phrase = document.getElementById("inputText").value;
    const count = countPasswordVariants(phrase, defaultOptions);
    document.getElementById("strengthQuantity").textContent = `Кількість можливих паролів: ${count}`;
}

document.getElementById("inputText").addEventListener("input", recalculateStrength);


function countPasswordVariants(phrase) {
    const transliterationMap = {
        "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "є": "ie", "ж": "zh",
        "з": "z", "и": "y", "і": "i", "ї": "yi", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", 
        "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
        "ч": "ch", "ш": "sh", "щ": "shch", "ю": "yu", "я": "ya", "ь": "'", "ы": "", "ъ": "", "э": "",
        "А": "A", "Б": "B", "В": "V", "Г": "G", "Ґ": "G", "Д": "D", "Е": "E", "Є": "IE", "Ж": "ZH",
        "З": "Z", "И": "Y", "І": "I", "Ї": "YI", "Й": "I", "К": "K", "Л": "L", "М": "M", "Н": "N",
        "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "H", "Ц": "TS",
        "Ч": "CH", "Ш": "SH", "Щ": "SHCH", "Ю": "YU", "Я": "YA", "Ь": "'", "Ы": "", "Ъ": "", "Э": ""
    };

    const replacementsNumbers = {};
    if (defaultOptions.includeZero) {
        replacementsNumbers["o"] = "0";
        replacementsNumbers["O"] = "0";
    }
    if (defaultOptions.includeOne) {
        replacementsNumbers["i"] = "1";
        replacementsNumbers["I"] = "1";
    }
    if (defaultOptions.includeThree) {
        replacementsNumbers["z"] = "3";
        replacementsNumbers["Z"] = "3";
    }
    if (defaultOptions.includeFour) {
        replacementsNumbers["ch"] = "4";
        replacementsNumbers["CH"] = "4";
    }
    if (defaultOptions.includeFive) {
        replacementsNumbers["s"] = "5";
        replacementsNumbers["S"] = "5";
    }
    if (defaultOptions.includeSix) {
        replacementsNumbers["b"] = "6";
        replacementsNumbers["B"] = "6";
    }
    if (defaultOptions.includeSeven) {
        replacementsNumbers["t"] = "7";
        replacementsNumbers["T"] = "7";
    }
    if (defaultOptions.includeEight) {
        replacementsNumbers["v"] = "8";
        replacementsNumbers["V"] = "8";
    }
    if (defaultOptions.includeNine) {
        replacementsNumbers["ya"] = "9";
        replacementsNumbers["YA"] = "9";
    }

    const replacementsSymbols = {};
    if (defaultOptions.includeAtSymbol) {
        replacementsSymbols["a"] = "@";
        replacementsSymbols["A"] = "@";
    }
    if (defaultOptions.includeDollarSymbol) {
        replacementsSymbols["s"] = "$";
        replacementsSymbols["S"] = "$";
    }
    if (defaultOptions.includeExclamationMark) {
        replacementsSymbols["i"] = "!";
        replacementsSymbols["I"] = "!";
    }
    if (defaultOptions.includePercentSymbol) {
        replacementsSymbols["f"] = "%";
        replacementsSymbols["F"] = "%";
    }
    if (defaultOptions.includeW) {
        replacementsSymbols["sh"] = "w";
        replacementsSymbols["SH"] = "W";
    }
    if (defaultOptions.includeHashTag) {
        replacementsSymbols["n"] = "#";
        replacementsSymbols["N"] = "#";
    }

    const spaceReplacements = [];
    if (defaultOptions.includeDot) spaceReplacements.push(".");
    if (defaultOptions.includeMinus) spaceReplacements.push("-");
    if (defaultOptions.includePlus) spaceReplacements.push("+");
    if (defaultOptions.includeUnderscore) spaceReplacements.push("_");
    if (defaultOptions.includeColon) spaceReplacements.push(":");
    if (defaultOptions.includeSemicolon) spaceReplacements.push(";");
    if (defaultOptions.includeSlash) spaceReplacements.push("/");
    if (defaultOptions.includeAmbersant) spaceReplacements.push("&");

    const specialLetters = ["shch", "ch", "sh", "ya", "yu", "yi", "ie"];
    let count = 1;

    for (let i = 0; i < phrase.length; i++) {
        let matchFound = false;

        for (const letter of specialLetters) {
            if (phrase.slice(i, i + letter.length) === letter) {
                i += letter.length - 1; 
                matchFound = true;
                count *= getVariantCount(letter);
                break;
            }
        }

        if (!matchFound) {
            const char = phrase[i];
            count *= getVariantCount(char);
        }
    }
    console.log(`Кількість можливих паролів: ${count}`)

    return count;

    function getVariantCount(char) {
        let variants = 1;
        if (replacementsNumbers[transliterationMap[char] || char]) variants++;
        if (replacementsSymbols[transliterationMap[char] || char]) variants++;
        if (char === ' ' && spaceReplacements.length > 0) variants += spaceReplacements.length - 1;
        return variants;
    }
}



// Повзунок
document.getElementById("inputText").addEventListener("input", function() {
    const inputText = this.value.trim();
    const transliteratedText = transliterate(inputText);
    const passwordLength = transliteratedText.length;

    let slider = document.getElementById("passwordLength");
    let passwordLengthText = document.getElementById("passwordLengthText");
    let lengthText = document.getElementById("lengthValue");

    let color;

    if (passwordLength === 0) {
        color = "#555";
    } else if (passwordLength <= 6) {
        color = "red";
    } else if (passwordLength <= 9) {
        color = "#e77d22";
    } else if (passwordLength <= 12) {
        color = "#ecd823";
    } else if (passwordLength <= 16) {
        color = "#5dc566";
    } else {
        color = "green";
    }

    passwordLengthText.style.color = color
    lengthValue.style.color = color

    slider.value = passwordLength;
    lengthText.textContent = passwordLength;
});
























// ЗАГАЛЬНЕ

// Відправка пароля на пошту
const mailButton = document.getElementById('mailButton');
const closeModalButton = document.getElementById('close-modal-button');
const modal = document.getElementById('modal-window-email');

mailButton.addEventListener('click', () => {
    if (outputPassword.innerText.trim() === '') {
        alert('Ви не згенерували пароль');
    } else {
        modal.classList.add('active');
    }
});

closeModalButton.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('active');
    }
});


const sendEmailButton = document.getElementById('sendMailButton');

document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();

    sendEmailButton.innerText = 'Надсилається...';

    const passwordDiv = document.getElementById('outputPassword');
    const passwordText = passwordDiv.innerText;
    const inputTextDiv = document.getElementById('inputText');
    const inputTextValue = inputTextDiv.value;

    const radioPassword = document.getElementById('radioPassword');
    const selectedValue = radioPassword.checked ? passwordText : inputTextValue;

    document.getElementById('generated_password').value = selectedValue;
    document.getElementById('input-mail-text').value = selectedValue;

    console.log(selectedValue);

    const serviceID = 'default_service';
    const templateID = 'template_6jdout7';

    emailjs.sendForm(serviceID, templateID, this).then(() => {
        sendEmailButton.innerText = 'Надіслати';
        alert('Відправлено!');
        modal.classList.remove('active');
    }, 
    (err) => {
        sendEmailButton.innerText = 'Надіслати';
        alert(JSON.stringify(err));
    });
});





// Копіювання пароля


const passwordDiv = document.getElementById('outputPassword');
const passwordText = passwordDiv.innerText;
document.getElementById('generated_password').value = generated_password;

// Ентропія
const charSets = {
    lowercase: 26,
    uppercase: 26,
    digits: 10,
    special: 32,
};

function calculateEntropy(generated_password) {
    let length = generated_password.length;
    if (length === 0) return 0;

    let charPool = 0;
    if (/[a-z]/.test(generated_password)) charPool += charSets.lowercase;
    if (/[A-Z]/.test(generated_password)) charPool += charSets.uppercase;
    if (/\d/.test(generated_password)) charPool += charSets.digits;
    if (/[^a-zA-Z\d]/.test(generated_password)) charPool += charSets.special;

    return length * Math.log2(charPool);
}

function updateStrengthIndicator(entropy) {
    const strengthBar = document.getElementById("strengthBar");
    const strengthMessage = document.getElementById("strengthMessage");
    const strengthTime = document.getElementById("strengthTime");

    let color, width, text = "Кількість можливих паролів";

    if (entropy <= 1) {
        width = "0%";
        color = "rgba(180, 180, 180, 0.5)";
        text = "Сила пароля";
    } else if (entropy > 1 && entropy <= 34) {
        width = "20%";
        color = "red";
        text = `Дуже слабкий, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy > 34 && entropy <= 54) {
        width = "40%";
        color = "#e77d22";
        text = `Слабкий, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy > 54 && entropy < 70) {
        width = "60%";
        color = "#fce205";
        text = `Середній, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy >= 70 && entropy < 96) {
        width = "80%";
        color = "lightgreen";
        text = `Сильний, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy >= 96) {
        width = "100%";
        color = "green";
        text = `Дуже сильний, ентропія: ${Math.round(entropy)} біт`;
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;

    strengthMessage.textContent = text;
    strengthMessage.style.color = color;
    
    strengthTime.style.color = color;
}


function calculateCrackTime(entropy, attemptsPerSecond = 1e12, algorithmSlowdownFactor = 1) {
    if (entropy <= 0) return "Пароль неможливо зламати.";

    const combinations = Math.pow(2, entropy);

    const adjustedAttemptsPerSecond = attemptsPerSecond / algorithmSlowdownFactor;

    const timeInSeconds = combinations / adjustedAttemptsPerSecond;

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    if (timeInSeconds < secondsInMinute) {
        return `${Math.floor(timeInSeconds)} секунд`;
    } else if (timeInSeconds < secondsInHour) {
        return `${Math.floor(timeInSeconds / secondsInMinute)} хвилин`;
    } else if (timeInSeconds < secondsInDay) {
        return `${Math.floor(timeInSeconds / secondsInHour)} годин`;
    } else if (timeInSeconds < secondsInMonth) {
        return `${Math.floor(timeInSeconds / secondsInDay)} днів`;
    } else if (timeInSeconds < secondsInYear) {
        return `${Math.floor(timeInSeconds / secondsInMonth)} місяців`;
    } else {
        const timeInYears = timeInSeconds / secondsInYear;

        if (timeInYears < 1) {
            return "менше року";
        } else if (timeInYears < 100) {
            return `${Math.floor(timeInYears)} років`;
        } else if (timeInYears < 1000) {
            return `${Math.floor(timeInYears / 100)} століть`;
        } else if (timeInYears < 1e6) {
            return `${Math.floor(timeInYears / 1000)} тисячоліть`;
        } else if (timeInYears < 1e9) {
            return `${Math.floor(timeInYears / 1e6)} мільйонів років`;
        } else if (timeInYears < 1e12) {
            return `${Math.floor(timeInYears / 1e9)} мільярдів років`;
        } else if (timeInYears < 1e15) {
            return `${Math.floor(timeInYears / 1e12)} трильйонів років`;
        } else {
            return `${Math.floor(timeInYears / 1e15)} квадрильйонів років`;
        }
    }
}


const outputPasswordElement = document.getElementById("outputPassword");

function updatePasswordEntropy() {
    const password = outputPasswordElement.innerText.trim();
    if (password) {
        const entropy = calculateEntropy(password);
        updateStrengthIndicator(entropy);

        const crackTime = calculateCrackTime(entropy);

        console.log(`Згенерований пароль: ${password}`);
        console.log(`Ентропія пароля: ${Math.round(entropy)} біт`);
        console.log(`Оцінений час зламу: ${crackTime}`);
        
        const crackTimeElement = document.getElementById("strengthTime");
        crackTimeElement.textContent = `Час зламу: ${crackTime}`;
    } else {
        updateStrengthIndicator(0);
        console.log("Поле пароля порожнє.");
        const crackTimeElement = document.getElementById("strengthTime");
        crackTimeElement.textContent = "Час взлому";
    }
}


const entropyObserver = new MutationObserver(() => {
    updatePasswordEntropy();
});

entropyObserver.observe(outputPasswordElement, { childList: true, subtree: true, characterData: true });

document.getElementById("inputText").addEventListener("input", function () {
    const inputText = document.getElementById("inputText").value.trim();
    const transliterated = transliterate(inputText);
    let password = transliterated;

    if (inputText == "") {
        document.getElementById("outputPassword").textContent = "";
        password = "";

        return
    }
});


document.getElementById("inputText").addEventListener("input", function () {
    const inputText = document.getElementById("inputText").value.trim();
    const transliterated = transliterate(inputText);
    let password = transliterated;

    if (inputText == "") {
        document.getElementById("outputPassword").textContent = "";
        password = "";

        return
    }
});





// Плавне проматування по сторінці
document.querySelectorAll('.text-fixed-header a').forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const targetID = this.getAttribute('href');
        const target = document.querySelector(targetID);

        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelectorAll('#scroll-link').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        window.scrollTo({
            top: target.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});
