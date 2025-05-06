function updatePassword() {
    const inputText = document.getElementById("inputText").value.trim();
    const passwordLength = document.getElementById("passwordLength").value;
    const includeSpaceReplacements = document.getElementById("includeSpaceReplacements").checked;

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
        transliterated, passwordLength, includeSpaceReplacements,
        includeDot, includeMinus, includePlus, includeUnderscore, includeColon, includeSemicolon, includeSlash, includeAmbersant
    );

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;
}

document.getElementById("generateButton").addEventListener("click", updatePassword);
document.getElementById("passwordLength").addEventListener("input", updatePassword);

// Функції транслітерації
function transliterate(text) {
    const transliterationMap = {
        "а": "a", "б": "6", "в": "B", "г": "r", "ґ": "r", "д": "q", "е": "e", "є": "e", "ж": "*",
        "з": "3", "и": "u", "і": "i", "ї": "i", "й": "u", "к": "K", "л": "/\\", "м": "M", "н": "H", 
        "о": "o", "п": "n", "р": "p", "с": "c", "т": "T", "у": "y", "ф": "%", "х": "x", "ц": "u,",
        "ч": "4", "ш": "w", "щ": "w", "ю": "|o", "я": "9", "ь": "b",
        "А": "A", "Б": "6", "В": "D", "Г": "r", "Ґ": "r", "Д": "D", "Е": "E", "Є": "E", "Ж": "*",
        "З": "3", "И": "U", "І": "I", "Ї": "I", "Й": "U", "К": "K", "Л": "/\\", "М": "M", "Н": "H",
        "О": "O", "П": "N", "Р": "P", "С": "C", "Т": "T", "У": "Y", "Ф": "%", "Х": "x", "Ц": "U,",
        "Ч": "4", "Ш": "W", "Щ": "W", "Ю": "|o", "Я": "9", "Ь": "b"
    };
    return text.split("").map(char => transliterationMap[char] || char).join("");
}

function generatePassword(transliterated, length, includeSpaceReplacements,
                          includeDot, includeMinus, includePlus, includeUnderscore, includeColon, includeSemicolon, includeSlash, includeAmbersant) {
    const spaceReplacements = [];

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
        
        crypto.getRandomValues(randomArray); 
        let randomNumber = randomArray[0] / 255;
        
        if (char === " ") {
            if (includeSpaceReplacements && spaceReplacements.length > 0) {
                password += spaceReplacements[Math.floor(randomNumber * spaceReplacements.length)];
            }
        } else {
            password += char;
        }

        i++;
    }

    return password;
}



document.getElementById('leetspeak-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});
document.getElementById('mneme-button').addEventListener('click', function () {
    window.location.href = 'second-generator.html';
});
document.getElementById('random-button').addEventListener('click', function () {
    window.location.href = 'forth-generator.html';
});


// Виключення/включення чекбоксів
const majorSymbolReplacementsCheckbox = document.getElementById("includeSpaceReplacements");
const minorSymbolReplacementsCheckbox = document.querySelectorAll(".space-dropdown-content input[type='checkbox']");
majorSymbolReplacementsCheckbox.addEventListener("change", function () {
    const isChecked = this.checked;
    minorSymbolReplacementsCheckbox.forEach(checkboxes => {
        checkboxes.checked = isChecked;
    });
});
minorSymbolReplacementsCheckbox.forEach(checkboxes => {
    checkboxes.addEventListener("change", function () {
        const anyChecked = Array.from(minorSymbolReplacementsCheckbox).some(checkbox => checkbox.checked);
        majorSymbolReplacementsCheckbox.checked = anyChecked;
    });
});


// Дропдаун меню
function toggleSpaceDropdown() {
    document.getElementById("space-dropdown-content").classList.toggle("showSpaceReplacements");
}

window.onclick = function(event) {
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
