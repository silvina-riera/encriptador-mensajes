const d = document;
const textArea = d.querySelector(".form__input");
const imagePerson = d.querySelector(".result__img");
const loaderSea = d.querySelector(".loader");
const resultTitle = d.querySelector(".result__title");
const resultText = d.querySelector(".result__text");
const btnEncrypt = d.querySelector(".form__btn");
const btnDecrypt = d.querySelectorAll(".form__btn");
const btnCopy = d.querySelector("button");

const keys = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encryptMessage (message) {
    let encryptedMessage = "";
    for(let i = 0; i < message.length; i++) {
        let letter = message[i];
        let encrypted = letter;
        for(let j = 0; j < keys.length; j++) {
            if (letter === keys[j][0]) {
                encrypted = keys[j][1];
            break;
            }
        }
        encryptedMessage += encrypted;
    }
    return encryptedMessage;
}

function decryptMessage (message) {
    let decryptedMessage = message;
    for(let i = 0; i < keys.length; i++) {
        let regex = new RegExp(keys[i][1], 'g');
        decryptedMessage = decryptedMessage.replace(regex, keys[i][0]);
    }
    return decryptedMessage;
}

textArea.addEventListener ("input", (e)=>{
    imagePerson.style.display = "none";
    loaderSea.classList.remove("hidden");
    resultTitle.textContent = "Capturando mensaje";
    resultText.textContent = "";
});

function removeDiactriticsEs(message) {
    return message
           .normalize('NFD')
           .replace(/([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,"$1")
           .normalize();
}

 btnEncrypt.addEventListener ("click", (e)=>{
    e.preventDefault();
    let message = removeDiactriticsEs(textArea.value.toLowerCase());
    let messageEncrypted = encryptMessage(message);
    resultText.textContent = messageEncrypted;
    btnCopy.classList.remove("hidden");
    resultTitle.textContent = "El mensaje encriptado es:";
 });

 btnDecrypt[1].addEventListener ("click", (e)=>{
    e.preventDefault();
    let message = removeDiactriticsEs(textArea.value.toLowerCase());
    let messageDecrypted = decryptMessage(message);
    resultText.textContent = messageDecrypted;
    resultTitle.textContent = "El mensaje desencriptado es:";
    btnCopy.classList.remove("hidden");
 });

 btnCopy.addEventListener ("click", (e)=>{
    let textCopy = resultText.textContent;
    navigator.clipboard.writeText(textCopy).then(()=>{
        imagePerson.style.display = "block";
        loaderSea.classList.add("hidden");
        resultTitle.textContent = "El mensaje se copió.";
        btnCopy.classList.add("hidden");
        resultText.textContent = "";
    })
 });