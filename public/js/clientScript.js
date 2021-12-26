const socket = io(process.env.PORT || "http://localhost:3000")

const messageForm = document.getElementById("send-container")
const msgInput = document.getElementById("messageInput")
const msgContainer = document.getElementById("chatContainer")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userName = urlParams.get('username');
const meetingTitle = urlParams.get('meetingTitle');
console.log(userName + "client");

function scrollToBottom() {
    console.log($(".container")[1]);
    // msgContainer.scrollTop = msgContainer.scrollHeight;
    var div=$(".container")[1];
    div.scrollTop = div.scrollHeight;
    // $(".container")[1].animate({
    //     scrollTop: $(".container")[1].scrollHeight
    // }, 1000);
}

appendNewUser("You Joined")
socket.emit("new-user", roomID, userName)

socket.on("user-join-info", userName => {
    appendNewUser(userName + ' joined')
})

socket.on("user-disconnected", userName => {
    console.log("Disconnected")
    appendNewUser(userName + ' left')
})

socket.on("chat-message", data => {
    appendMessage(data)
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const msg = msgInput.value
    socket.emit("send-chat-message", roomID, msg)
    appendOwnMessage(msg)
    msgInput.value = ""
})

function appendOwnMessage(message) {
    const toBeAppended = document.createElement("div")
    toBeAppended.innerText = message
    toBeAppended.className = "chat-log__item chat-log__item--own"
    msgContainer.append(toBeAppended)
    scrollToBottom();
}

function appendMessage(data) {
    const date = new Date();
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];


    const toBeAppended = document.createElement("div")
    toBeAppended.className = "chat-log__item"

    //timeStamp
    const timeStamp = document.createElement("small")
    timeStamp.innerText = " " + hour + ":" + (minutes < 10 ? "0" + minutes : minutes);

    //user name
    const sentUserName = document.createElement("h3")
    sentUserName.className = "chat-log__author"
    sentUserName.innerText = data.name
    sentUserName.append(timeStamp)

    // text message
    const sentText = document.createElement("div")
    sentText.className = "chat-log__message"
    sentText.innerText = data.message


    //appending to make the final div toBeAppended
    toBeAppended.append(sentUserName)
    toBeAppended.append(sentText)

    //final div appending
    var shouldScroll = msgContainer.scrollTop + msgContainer.clientHeight === msgContainer.scrollHeight;
    msgContainer.append(toBeAppended)
    if (!shouldScroll) {
        scrollToBottom();
    }
}

function appendNewUser(userName) {
    const newUserInfoDiv = document.createElement("div");
    newUserInfoDiv.className = "yellow-box"
    newUserInfoDiv.innerText = userName
    var shouldScroll = msgContainer.scrollTop + msgContainer.clientHeight === msgContainer.scrollHeight;
    msgContainer.append(newUserInfoDiv)
    if (!shouldScroll) {
        scrollToBottom();
    }
}