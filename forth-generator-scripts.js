function updatePassword() {
    const passwordLength = document.getElementById("passwordLength").value;
    const includeLowercase = document.getElementById("includeLowercase").checked;
    const includeUppercase = document.getElementById("includeUppercase").checked;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    const password = generatePassword(
        passwordLength, includeLowercase, includeUppercase, includeNumbers, includeSymbols
    );

    document.getElementById("outputPassword").innerHTML = password;
    document.getElementById("generated_password").value = password;
}

document.getElementById("generateButton").addEventListener("click", updatePassword);
document.getElementById("passwordLength").addEventListener("input", updatePassword);

document.getElementById("includeLowercase").addEventListener("change", updatePassword);
document.getElementById("includeUppercase").addEventListener("change", updatePassword);
document.getElementById("includeNumbers").addEventListener("change", updatePassword);
document.getElementById("includeSymbols").addEventListener("change", updatePassword);

document.getElementById('leetspeak-button').addEventListener('click', function () {
    window.location.href = 'index.html';
});
document.getElementById('mneme-button').addEventListener('click', function () {
    window.location.href = 'second-generator.html';
});
document.getElementById('ukrainian-alike-button').addEventListener('click', function () {
    window.location.href = 'third-generator.html';
});


document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll(".include_checkbox");

    function validateCheckboxes() {
        const checked = [...checkboxes].filter(c => c.checked);

        if (checked.length === 1) {
            checked[0].disabled = true;
        } else {
            checkboxes.forEach(c => c.disabled = false);
        }
    }

    checkboxes.forEach(chk => {
        chk.addEventListener("change", validateCheckboxes);
    });

    validateCheckboxes();
});



// Функція генерації пароля
function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_+=?/\\{}[]|.,:;";

    let characterPool = "";

    if (includeLowercase) characterPool += lowercase;
    if (includeUppercase) characterPool += uppercase;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    let password = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += characterPool[array[i] % characterPool.length];
    }

    return password;
}



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
    document.getElementById('generated_password').value = passwordText;
    console.log(passwordText)

    const outputPasswordDiv = document.getElementById("outputPassword")
    const outputPasswordValue = outputPasswordDiv.value;
    document.getElementById("input-mail-text").value = outputPasswordValue;
    console.log(outputPasswordValue);

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

        if (timeInYears < 100) {
            return "роки";
        } else if (timeInYears < 1000) {
            return "століття";
        } else if (timeInYears < 1e6) {
            return "тисячоліття";
        } else if (timeInYears < 1e9) {
            return "мільйони років";
        } else if (timeInYears < 1e12) {
            return "мільярди років";
        } else if (timeInYears < 1e15) {
            return "трильйони років";
        } else if (timeInYears < 1e18) {
            return "квадрильйони років";
        } else {
            return "квінтільйони років";
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




// Повзунок
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
