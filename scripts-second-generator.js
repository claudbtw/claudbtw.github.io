// Відстежуємо зміни в полях і оновлюємо повзунок
function updateSlider() {
    const inputText = document.getElementById("inputText").value.trim();
    const inputNumber = document.getElementById("inputNumber").value.trim();
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let sliderValue = 0;

    if (inputText) {
        const words = inputText.trim().split(' ').filter(word => word.length > 0);
        sliderValue += words.length;

        for (let word of words) {
            if (word.includes('ч') || word.includes('Ч')) {
                sliderValue += 2;
            }
            if (word.includes('ш') || word.includes('Ш')) {
                sliderValue += 2;
            }
            if (word.includes('щ') || word.includes('Щ')) {
                sliderValue += 4;
            }
        }
    }

    if (inputNumber) {
        let digits = '';
        for (let i = 0; i < inputNumber.length; i++) {
            if (inputNumber[i] >= '0' && inputNumber[i] <= '9') {
                digits += inputNumber[i];
            }
        }
        sliderValue += digits.length;
    }

    if (includeSymbols) {
        sliderValue += 2;
    }

    document.getElementById("passwordLength").value = sliderValue;
    document.getElementById("lengthValue").textContent = sliderValue;
}

document.getElementById("inputText").addEventListener("input", updateSlider);
document.getElementById("inputNumber").addEventListener("input", updateSlider);
document.getElementById("includeSymbols").addEventListener("change", updateSlider);

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
});

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
    return text.split(' ')
        .map(word => word[0]?.toLowerCase() || '')
        .map(char => transliterationMap[char] || char)
        .join('');
}

const text = "Добрий день моя улюбленна Україно";
const result = transliterate(text);
console.log(result);  // ["d", "d", "m", "u", "u"]


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
    const randomChoice = Math.random() < 0.5 ? 0 : lettersArray.length - 1;
    lettersArray[randomChoice] = lettersArray[randomChoice].toUpperCase();

    return lettersArray.join('');
}

const uppercaseResult = applyUppercase(result);
console.log(uppercaseResult);


function addRandomSymbols(password) {
    const symbols = "!@#$%&*_+;:,.<>?";
    const randomSymbols = symbols.charAt(Math.floor(Math.random() * symbols.length)) +
        symbols.charAt(Math.floor(Math.random() * symbols.length));

    if (Math.random() < 1) {
        return password + randomSymbols;
    }
}







document.getElementById("passwordLength").addEventListener("input", function() {
    document.getElementById("lengthValue").textContent = this.value;
});

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