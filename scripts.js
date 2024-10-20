document.getElementById("generateButton").addEventListener("click", function() {
    const inputText = document.getElementById("inputText").value.trim();
    const passwordLength = document.getElementById("passwordLength").value;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    if (inputText === "") {
        alert("Поле введення тексту не може бути порожнім. Будь ласка, введіть текст.");
        return;
    }
    
    const transliterated = transliterate(inputText);
    const password = generatePassword(transliterated, passwordLength, includeUppercase, includeNumbers, includeSymbols);
    document.getElementById("outputPassword").value = password;
});

document.getElementById("passwordLength").addEventListener("input", function() {
    document.getElementById("lengthValue").textContent = this.value;
});

// Функції
function transliterate(text) {
    const transliterationMap = {
        "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "є": "ie", "ж": "zh",
        "з": "z", "и": "y", "і": "i", "ї": "yi", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", 
        "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "ts",
        "ч": "ch", "ш": "sh", "щ": "shch", "ю": "yu", "я": "ya",
    };

    return text.toLowerCase().split("").map(char => transliterationMap[char] || char).join("");
}

function generatePassword(transliterated, length, includeUppercase, includeNumbers, includeSymbols) { 
    const replacementsNumbers = {"e": "3", "i": "1", "o": "0", "s": "5", "a": "4", "ch": "4"};
    const replacementsSymbols = {"a": "@", "s": "$"};
    const spaceReplacements = [".", "-", "_"];

    let password = transliterated.split("").slice(0, length).map((char) => {
        let randomNumber = Math.random();
        
        if (char === " ") {
            return spaceReplacements[Math.floor(Math.random() * spaceReplacements.length)];
        }
        if (includeNumbers && replacementsNumbers[char] && randomNumber > 0.66) {
            return replacementsNumbers[char];
        } else if (includeSymbols && replacementsSymbols[char] && randomNumber < 0.33) {
            return replacementsSymbols[char];
        }
        return char;
    }).join("");

// Доповнення символів до пароля, при необхідності
    if (password.length < length) {
        while (password.length < length) {
            let randomChar = "";
            let randomNumber = Math.random();

            if (!includeUppercase && !includeNumbers && !includeSymbols) {
                randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            }
            else if (includeSymbols && randomNumber > 0.83) {
                const symbols = Object.values(replacementsSymbols);
                randomChar = symbols[Math.floor(Math.random() * symbols.length)];
            }            
            else if (includeNumbers && randomNumber < 0.2) {
                randomChar = Math.floor(Math.random() * 10).toString();
            } 
            else {
                randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            }
            password += randomChar;
        }
    }    

// Перша та остання літери становляться заглавними, якщо це дозволено
    if (includeUppercase && password.length > 0) {
        password = password[0].toUpperCase() + password.slice(1, -1) + password.slice(-1).toUpperCase();
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
