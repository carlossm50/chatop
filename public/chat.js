const socket = io()
//Elements
let btn = document.getElementById('send');
let message = document.getElementById('message');
let username = document.getElementById('username');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


const emitbtn = () => {
    socket.emit('chat:message',
        {
            username: username.value,
            message: message.value
        }
    );
    message.value = '';
}

btn.addEventListener('click', function () {
    emitbtn();
})

message.addEventListener('keypress', function (e) {
    socket.emit('chat:typing', username.value);

    if (e.code === "Enter") {
        emitbtn();
    }
})
socket.on('chat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += '<p> ' + data.message + '</p>'

    window.scrollTo(0, output.scrollHeight);
})
socket.on('chat:typing', (data) => {
    actions.innerHTML = '<p>' + data + ' is Writing' + '</p>'
})