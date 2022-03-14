const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const maxLength = 469;


const serverip = location.host.split(':');
const ws = new WebSocket("ws://" + serverip[0] + ":8069");

const password = "Topolina22";
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
            if (message.length < maxLength && message.length > 0 && message != " ") {

                ws.send(`${name}: ${message}`);
                appendMessage(`You: ${message}`);
                messageInput.value = '';

            } else if (message.length == 0) {
                alert("Il messaggio deve contenere alemeno un carattere");
                t
            } else {
                alert("Hai superato il limite di " + maxLength + " caratteri")
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