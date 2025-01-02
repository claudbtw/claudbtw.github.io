document.getElementById("generateButton").addEventListener("click", function() {
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
    // Стан вибору кожної цифри
    const includeZero = document.getElementById("includeZero").checked;
    const includeOne = document.getElementById("includeOne").checked;
    const includeThree = document.getElementById("includeThree").checked;
    const includeFour = document.getElementById("includeFour").checked;
    const includeFive = document.getElementById("includeFive").checked;
    const includeSix = document.getElementById("includeSix").checked;
    const includeSeven = document.getElementById("includeSeven").checked;
    // Стан вибору кожного символу-роздільника
    const includeDot = document.getElementById("spaceDot").checked;
    const includeMinus = document.getElementById("spaceMinus").checked;
    const includeUnderscore = document.getElementById("spaceUnderscore").checked;
    const includeColon = document.getElementById("spaceColon").checked;
    const includeSemicolon = document.getElementById("spaceSemicolon").checked;
    const includeSlash = document.getElementById("spaceSlash").checked;

    if (inputText === "") {
        alert("Поле введення тексту не може бути порожнім. Будь ласка, введіть текст.");
        return;
    }
    
    const transliterated = transliterate(inputText);
    const password = generatePassword(transliterated, passwordLength, includeUppercase, includeSpaceReplacements, includeNumbers, includeSymbols,
                                      includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeW,
                                      includeZero, includeOne, includeThree, includeFour, includeFive, includeSix, includeSeven,
                                      includeDot, includeMinus, includeUnderscore, includeColon, includeSemicolon, includeSlash);

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;
});


// Функції транслітерації
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

function generatePassword(transliterated, length, includeUppercase, includeSpaceReplacements, includeNumbers, includeSymbols,
                          includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeW,
                          includeZero, includeOne, includeThree, includeFour, includeFive, includeSix, includeSeven,
                          includeDot, includeMinus, includeUnderscore, includeColon, includeSemicolon, includeSlash) {
    const replacementsNumbers = {};
    const replacementsSymbols = {};
    const spaceReplacements = [];

    // Вибір цифр
    if (includeZero) {
        replacementsNumbers["o"] = "0";
        replacementsNumbers["O"] = "0";
    }
    
    if (includeOne) {
        replacementsNumbers["i"] = "1";
        replacementsNumbers["I"] = "1";
    }
    
    if (includeThree) {
        replacementsNumbers["z"] = "3";
        replacementsNumbers["Z"] = "3";
    }
    if (includeFour) {
        replacementsNumbers["ch"] = "4";
        replacementsNumbers["CH"] = "4";
    }
    if (includeFive) {
        replacementsNumbers["s"] = "5";
        replacementsNumbers["S"] = "5";
    }
    if (includeSix) {
        replacementsNumbers["b"] = "6";
        replacementsNumbers["B"] = "6";
    }
    if (includeSeven) {
        replacementsNumbers["t"] = "7";
        replacementsNumbers["T"] = "7";
    }

    // Вибір символів
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
    if (includeW) {
        replacementsSymbols["sh"] = "w";
        replacementsSymbols["SH"] = "W";
    }

    // Вибір символів-роздільників
    if (includeDot) spaceReplacements.push(".");
    if (includeMinus) spaceReplacements.push("-");
    if (includeUnderscore) spaceReplacements.push("_");
    if (includeColon) spaceReplacements.push(":");
    if (includeSemicolon) spaceReplacements.push(";");
    if (includeSlash) spaceReplacements.push("/");

    let password = "";
    let i = 0;
    
    while (i < transliterated.length && password.length < length) {
        let char = transliterated[i];
        let nextChar = transliterated[i + 1] || "";
        let randomNumber = Math.random();
    
        // Обробка багатосимвольних замін
        if ((char + nextChar === "ch" || char + nextChar === "CH") && includeNumbers && replacementsNumbers["ch"] && randomNumber < 0.4) {
            password += replacementsNumbers["ch"];
            i += 2;
            continue;
        }
        if ((char + nextChar === "sh" || char + nextChar === "SH") && includeSymbols && replacementsSymbols["sh"] && randomNumber > 0.6) {
            password += replacementsSymbols["sh"];
            i += 2;
            continue;
        }
        
        // Обробка стандартних замін
        if (char === " " && !includeSpaceReplacements) {
            i++;
            continue;
        }
        if (char === " " && includeSpaceReplacements) {
            password += spaceReplacements[Math.floor(Math.random() * spaceReplacements.length)];
            i++;
            continue;
        }
        if (includeNumbers && replacementsNumbers[char] && randomNumber < 0.5) {
            password += replacementsNumbers[char];
        } else if (includeSymbols && replacementsSymbols[char] && randomNumber > 0.5) {
            password += replacementsSymbols[char];
        } else if (!includeUppercase) {
            password += char.toLowerCase();
        } else {
            password += char;
        }
        i++;
    }
    
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
    
    if (includeUppercase && password.length > 0) {
        let firstLetter = password[0].toUpperCase();
        let lastLetter = password.slice(-1).toUpperCase();
        let middleSection = password.slice(1, -1);
    
        password = firstLetter + middleSection + lastLetter;
    }
    
    return password;
}


// Генерація пароля при зміні значення на повзунку
document.getElementById("passwordLength").addEventListener("input", function() {
    const inputText = document.getElementById("inputText").value.trim();
    const passwordLength = this.value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const includeSpaceReplacements = document.getElementById("includeSpaceReplacements").checked;

    const includeAtSymbol = document.getElementById("includeAtSymbol").checked;
    const includeDollarSymbol = document.getElementById("includeDollarSymbol").checked;
    const includePercentSymbol = document.getElementById("includePercentSymbol").checked;
    const includeW = document.getElementById("includeW").checked;

    const includeZero = document.getElementById("includeZero").checked;
    const includeOne = document.getElementById("includeOne").checked;
    const includeThree = document.getElementById("includeThree").checked;
    const includeFour = document.getElementById("includeFour").checked;
    const includeFive = document.getElementById("includeFive").checked;
    const includeSix = document.getElementById("includeSix").checked;
    const includeSeven = document.getElementById("includeSeven").checked;

    const includeDot = document.getElementById("spaceDot").checked;
    const includeMinus = document.getElementById("spaceMinus").checked;
    const includeUnderscore = document.getElementById("spaceUnderscore").checked;
    const includeColon = document.getElementById("spaceColon").checked;
    const includeSemicolon = document.getElementById("spaceSemicolon").checked;
    const includeSlash = document.getElementById("spaceSlash").checked;

    if (inputText === "") {
        document.getElementById("outputPassword").innerHTML = "";
        return;
    }

    const transliterated = transliterate(inputText);
    const password = generatePassword(transliterated, passwordLength, includeUppercase, includeSpaceReplacements, includeNumbers, includeSymbols, 
                                      includeAtSymbol, includeDollarSymbol, includePercentSymbol, includeW,
                                      includeZero, includeOne, includeThree, includeFour, includeFive, includeSix, includeSeven,
                                      includeDot, includeMinus, includeUnderscore, includeColon, includeSemicolon, includeSlash);

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;
});


// Виключення/включення чекбоксів
const majorSymbolCheckbox = document.getElementById("includeSymbols");
const minorSymbolCheckboxes = document.querySelectorAll(".symbols-dropdown-content input[type='checkbox']");
majorSymbolCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;
    minorSymbolCheckboxes.forEach(checkboxes => {
        checkboxes.checked = isChecked;
    });
});
minorSymbolCheckboxes.forEach(checkboxes => {
    checkboxes.addEventListener("change", function () {
        const anyChecked = Array.from(minorSymbolCheckboxes).some(checkbox => checkbox.checked);
        majorSymbolCheckbox.checked = anyChecked;
    });
});

const majorNumberCheckbox = document.getElementById("includeNumbers");
const minorNumberCheckboxes = document.querySelectorAll(".numbers-dropdown-content input[type='checkbox']");
majorNumberCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;
    minorNumberCheckboxes.forEach(checkboxes => {
        checkboxes.checked = isChecked;
    });
});
minorNumberCheckboxes.forEach(checkboxes => {
    checkboxes.addEventListener("change", function () {
        const anyChecked = Array.from(minorNumberCheckboxes).some(checkbox => checkbox.checked);
        majorNumberCheckbox.checked = anyChecked;
    });
});



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
    document.getElementById('generated_password').value = passwordText;
    console.log(passwordText)

    const serviceID = 'default_service';
    const templateID = 'template_6jdout7';

    emailjs.sendForm(serviceID, templateID, this).then(() => {
        sendEmailButton.innerText = 'Надіслати';
        alert('Відправлено!');
        modal.classList.remove('active');
    }, 
    (err) => {
        sendEmailButton.value = 'Надіслати';
        alert(JSON.stringify(err));
    });
});

  

// Копіювання пароля
document.getElementById("copyButton").addEventListener("click", function() {
    const password = document.getElementById('outputPassword').innerText;

    if (!password) {
        alert("Пароль не згенеровано.");
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        alert("Пароль успішно скопійовано!");
    }).catch(err => {
        console.error("Failed to copy password:", err);
        alert("Не вдалося скопіювати пароль. Зпробуйте ще раз, будь ласка.");
    });
});



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
    const div = document.getElementById("outputPassword");
    const message = document.getElementById("strengthMessage");

    let color, text;

    if (entropy == 0) {
        div.style.boxShadow = "";
        text = "";
    } else if (entropy < 34) {
        color = "red";
        text = "Very Weak";
    } else if (entropy < 60) {
        color = "yellow";
        text = "Medium";
    } else if (entropy < 90) {
        color = "lightgreen";
        text = "Strong";
    } else {
        color = "green";
        text = "Very Strong";
    }

    div.style.boxShadow = `0 0 10px ${color}`;
    message.textContent = text;
    message.style.color = color;
}


const outputPasswordElement = document.getElementById("outputPassword");

function updatePasswordEntropy() {
    const password = outputPasswordElement.innerText.trim();
    if (password) {
        const entropy = calculateEntropy(password);
        updateStrengthIndicator(entropy);
        console.log(`Згенерований пароль: ${password}`);
        console.log(`Ентропія пароля: ${Math.round(entropy)} біт`);
    } else {
        updateStrengthIndicator(0);
        console.log("Поле пароля порожнє.");
    }
}

const observer = new MutationObserver(() => {
    updatePasswordEntropy();
});

observer.observe(outputPasswordElement, { childList: true, subtree: true, characterData: true });




// Інше
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
