const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const serverip = location.host.split(':');
const ws = new WebSocket("ws://" + serverip[0] + ":8069");

const password = "SUS Hub(beta)";
const pass = prompt('Enter the password!');
if (password == pass) {
    const name = prompt('What is your name?');
    if (name == null || name == "") {
        appendMessage("You didn't set your name correctly")
    } else {
        appendMessage("Connecting to the server");

        ws.onopen = function() {
            console.log("Connected to Server");
            appendMessage('Connected');
        };

        ws.onmessage = function({ data }) {
            appendMessage(`${data}`);
        };

        messageForm.addEventListener('submit', e => {
            e.preventDefault();
            const message = messageInput.value;
            if (message.length < 500 && message.length > 0 && message != " ") {
                ws.send(`${name}: ${message}`);
                appendMessage(`You: ${message}`);
                messageInput.value = '';
            } else {
                appendMessage("The message does not respect the requirements")
            }
        });
    }
} else {
    appendMessage("Wrong password!");
}

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}