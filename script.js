const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

document.addEventListener('DOMContentLoaded', () => {
    const length = +lengthEl.value; // "+" converts string to number
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasNumber, hasSymbol, length);
});

clipboardEl.addEventListener('click', () => {
    const password = resultEl.innerText;

    navigator.clipboard.writeText(password);
    clipboardEl.innerText = "密碼已複製!";
    setTimeout(() => (clipboardEl.innerText = "複製密碼"), 2000);
});

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(hasNumber, hasSymbol, length);
});

function generatePassword(number, symbol, length) {
    let generatedPassword = '';
    const typesArr = [{ lower: true }, { upper: true }]; // Always include uppercase and lowercase

    if (number) typesArr.push({ number });
    if (symbol) typesArr.push({ symbol });

    const typesCount = typesArr.length;

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => { // .forEach 是陣列的方法： 用於迭代 typesArr 的每個元素
            const funcName = Object.keys(type)[0]; // Object.keys()： 用於取得物件的所有鍵名，結果是一個陣列
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // 使用 Math.random() 隨機生成範圍 [0, 26) 的數字
}                                                                    // 加上 97（ASCII 值 a 的編碼），轉換為小寫字母

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}