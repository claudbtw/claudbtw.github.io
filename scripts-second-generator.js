// Генерація пароля
document.getElementById("generateButton").addEventListener("click", function () {
    const inputText = document.getElementById("inputText").value.trim();
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const passwordLength = document.getElementById("passwordLength").value;
    const inputNumber = document.getElementById("inputNumber").value.trim();

    if (inputText === "") {
        alert("Поле введення тексту не може бути порожнім. Будь ласка, введіть текст.");
        return;
    }

    const transliterated = transliterate(inputText);
    let password = transliterated;

    if (includeNumbers && inputNumber) {
        password = insertNumbersBetween(password, inputNumber);
    }

    if (includeUppercase) {
        password = applyUppercase(password);
    }

    if (includeSymbols) {
        password = addRandomSymbols(password);
    }

    password = password.substring(0, passwordLength);

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;

    const entropy = calculateEntropy(password);
    updateStrengthIndicator(entropy);
    
});



function transliterate(text) {
    const transliterationMap = {
        "а": "a", "б": "b", "в": "v", "г": "g", "ґ": "g", "д": "d", "е": "e", "є": "e", "ж": "z",
        "з": "z", "и": "y", "і": "i", "ї": "y", "й": "i", "к": "k", "л": "l", "м": "m", "н": "n", 
        "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u", "ф": "f", "х": "h", "ц": "t",
        "ч": "c", "ш": "s", "щ": "s", "ю": "u", "я": "y",
        "А": "A", "Б": "B", "В": "V", "Г": "G", "Ґ": "G", "Д": "D", "Е": "E", "Є": "E", "Ж": "Z",
        "З": "Z", "И": "Y", "І": "I", "Ї": "Y", "Й": "I", "К": "K", "Л": "L", "М": "M", "Н": "N",
        "О": "O", "П": "P", "Р": "R", "С": "S", "Т": "T", "У": "U", "Ф": "F", "Х": "H", "Ц": "T",
        "Ч": "C", "Ш": "S", "Щ": "S", "Ю": "U", "Я": "Y"
    };
    return text.split(' ')
        .map(word => word[0]?.toLowerCase() || '')
        .map(char => transliterationMap[char] || char)
        .join('');
}



function transliterateFirstLetters(text) {
    const words = text.trim().split(' ').filter(word => word.length > 0);
    const firstLetters = words.map(word => word[0] || '').join('');
    return transliterate(firstLetters);
}


function insertNumbersBetween(password, numbers, includeSymbols) {
    let result = "";
    const chars = password.split('');
    const nums = numbers.split('');
    const extraNumbers = [];

    for (let i = 0; i < chars.length; i++) {
        result += chars[i];
        if (i < nums.length) {
            result += nums[i];
        }
    }



    if (nums.length > chars.length) {
        let extraNums = nums.slice(chars.length);
        for (let i = 0; i < extraNums.length; i++) {
            extraNumbers.push(extraNums[i]);
        }
    }
    if (extraNumbers.length > 0) {
        const extraNumbersStr = extraNumbers.join('');
        if (includeSymbols && Math.random() >= 0.5) {
            result = result.replace(/([!@#$%*\[\]_+;:,.]+)$/, `${extraNumbersStr}$1`);
        } else {
            result += extraNumbersStr;
        }
    }
    return result;
}

function applyUppercase(letters) {
    const lettersArray = Array.from(letters);
    if (lettersArray.length > 0) {
        lettersArray[0] = lettersArray[0].toUpperCase();
    }
    if (lettersArray.length > 1) {
        lettersArray[lettersArray.length - 1] = lettersArray[lettersArray.length - 1].toUpperCase();
    }
    return lettersArray.join('');
}


function addRandomSymbols(password) {
    const symbols = "!@#$%&*_+;:,.<>?";
    const randomSymbols = symbols.charAt(Math.floor(Math.random() * symbols.length)) +
        symbols.charAt(Math.floor(Math.random() * symbols.length));

    if (Math.random() < 1) {
        return password + randomSymbols;
    }
}

// Відстежуємо зміни в полях і оновлюємо повзунок
let previousInputNumberLength = 0;

function updateSlider() {
    const inputText = document.getElementById("inputText").value.trim();
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const inputNumber = document.getElementById("inputNumber").value.trim();
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let sliderValue = 0;

    if (inputText) {
        const words = inputText.split(' ').filter(word => word.length > 0);
        sliderValue += words.length;
    }

    if (includeNumbers) {
        sliderValue += inputNumber.length;
    }

    if (includeSymbols) {
        sliderValue += 2;
    }

    document.getElementById("passwordLength").value = sliderValue;
    document.getElementById("lengthValue").textContent = sliderValue;

    previousInputNumberLength = inputNumber.length;
}

// Обробка зміни стану чекбокса includeNumbers
function handleIncludeNumbersChange() {
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const inputNumber = document.getElementById("inputNumber").value.trim();

    if (!includeNumbers) {
        const slider = document.getElementById("passwordLength");
        slider.value -= inputNumber.length;
        document.getElementById("lengthValue").textContent = slider.value;
    }

    updateSlider();
}

document.getElementById("inputText").addEventListener("input", updateSlider);
document.getElementById("inputNumber").addEventListener("input", updateSlider);
document.getElementById("includeNumbers").addEventListener("change", handleIncludeNumbersChange);
document.getElementById("includeSymbols").addEventListener("change", updateSlider);



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
    const strengthBar = document.getElementById("strengthBar");
    const strengthMessage = document.getElementById("strengthMessage");
    const strengthQuantity = document.getElementById("strengthQuantity");

    let color, width, text, textPass = "Кількість можливих паролів";

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
        color = "yellow";
        text = `Слабкий, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy > 54 && entropy < 70) {
        width = "60%";
        color = "yellow";
        text = `Середній, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy >= 70 && entropy < 96) {
        width = "80%";
        color = "lightgreen";
        text = `Сильний, ентропія: ${Math.round(entropy)} біт`;
    } else if (entropy >= 96) {
        width = "100%";
        color = "green";
        text = `Дуже сильний, ентропія: ${Math.round(entropy)} біт`;
        textPass = `Може бути створено 387420489 різних паролів`;
    }

    strengthBar.style.width = width;
    strengthBar.style.backgroundColor = color;

    strengthMessage.textContent = text;
    strengthMessage.style.color = color;

    strengthQuantity.textContent = textPass;
    strengthQuantity.style.color = color;
}

function calculateCrackTime(entropy, attemptsPerSecond = 1e12) {
    if (entropy <= 0) return "Пароль неможливо зламати.";

    const combinations = Math.pow(2, entropy);
    const timeInSeconds = combinations / attemptsPerSecond;

    const secondsInMinute = 60;
    const secondsInHour = secondsInMinute * 60;
    const secondsInDay = secondsInHour * 24;
    const secondsInMonth = secondsInDay * 30;
    const secondsInYear = secondsInDay * 365;

    if (timeInSeconds < secondsInMinute) {
        return "секунди";
    } else if (timeInSeconds < secondsInHour) {
        return "хвилини";
    } else if (timeInSeconds < secondsInDay) {
        return "години";
    } else if (timeInSeconds < secondsInMonth) {
        return "дні";
    } else if (timeInSeconds < secondsInYear) {
        return "місяці";
    } else {
        const timeInYears = timeInSeconds / secondsInYear;

        if (timeInYears < 1) {
            return "менше року";
        } else if (timeInYears < 100) {
            return "роки";
        } else if (timeInYears < 1000) {
            return "століття";
        } else if (timeInYears < 1e6) {
            return "тисячоліття";
        } else if (timeInYears < 1e9) {
            return "мільйони років";
        } else {
            return "мільярди років";
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


const observer = new MutationObserver(() => {
    updatePasswordEntropy();
});

observer.observe(outputPasswordElement, { childList: true, subtree: true, characterData: true });

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




// Інше
document.getElementById("passwordLength").addEventListener("input", function() {
    document.getElementById("lengthValue").textContent = this.value;
});

const inputText = document.getElementById('inputText');

inputText.addEventListener('input', () => {
    const length = inputText.value.length;

    if (length > 80) {
        inputText.style.height = '4.5em';
    } else if (length > 40) {
        inputText.style.height = '3em';
    } else {
        inputText.style.height = '2em';
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
