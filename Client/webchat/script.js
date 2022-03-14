const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const maxLength = 469;

const serverip = location.host.split(':');
const ws = new WebSocket("ws://" + serverip[0] + ":8069");

const name = prompt('What is your name?');
if (name == null || name == "") {
    alert("You didn't set your name correctly")
} else {
    appendMessage("Connecting to the server");

    ws.onopen = function() {
        appendMessage('Connected');
    };

    ws.onmessage = function({ data }) {
        appendMessage(`${data}`);
    };

    messageForm.addEventListener('submit', e => {
        e.preventDefault();
        const message = messageInput.value;
        if (message.length < maxLength && message.length > 0) {
            ws.send(`${name}: ${message}`);
            appendMessage(`You: ${message}`);
            messageInput.value = '';
        } else if (message.length == 0) {
            alert("Il messaggio deve contenere alemeno un carattere");
        } else if (message != " ") {
            alert("Il messaggio deve contenere delle lettere");
        } else {
            alert("Hai superato il limite di " + maxLength + " caratteri")
        }
    });
}

let btn = document.getElementById('btn');
var autoscroll = true;
btn.onclick = function() {
    if (autoscroll) {
        autoscroll = false;
        alert("Autoscroll disabled");
    } else {
        autoscroll = true;
        alert("Autoscroll enabled");
        window.scrollBy(0, window.innerHeight);
    }
};

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
    if (autoscroll) {
        window.scrollBy(0, window.innerHeight);
    }
}