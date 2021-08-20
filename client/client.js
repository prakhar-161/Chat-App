//socket.io connection to frontend
const socket = io();

let name = prompt('Enter name : ');

//Query DOM
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area')

//Send message upon hitting 'ENTER' key
textarea.addEventListener('keyup',(e) => {
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
});

//Send message function logic 
function sendMessage(message){
    let msg = { 
        user: name,
        message: message
    }

    //append message
    appendMessage(msg,'outgoing');
    textarea.value = '';
    

    //send to server
    socket.emit('message',msg);
}

//Append message function logic
function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');

    let display = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = display;
    messageArea.appendChild(mainDiv);
}

//recieve message
socket.on('message',(msg) => {
    appendMessage(msg, 'incoming');
}); 
