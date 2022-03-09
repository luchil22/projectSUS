const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const serverip = location.host.split(':');
const ws = new WebSocket("ws://" + serverip[0] + ":8069");

const name = prompt('What is your name?');

ws.onopen = function() {
    console.log("Connected to Server");
    appendMessage('You joined');
};

ws.onmessage = function({ data }) {
    appendMessage(`${data}`);
};

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    ws.send(`${name}: ${message}`);
    appendMessage(`You: ${message}`);
    messageInput.value = '';
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}