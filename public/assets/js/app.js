const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

//get user name and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//join chatroom
socket.emit("joinRoom", { username, room });

//get room and users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

//message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  chatMessages.scrollTop = chatMessages.scrollHeight; //scroll down to message
});

//message submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value; //get message text (via id="msg")

  socket.emit("chatMessage", msg); //emit message to server

  e.target.elements.msg.value = ""; //clear input
  e.target.elements.msg.focus(); //focus input
});

//output message to DOM
const outputMessage = (message) => {
  const div = document.createElement("div");

  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `;
  document.querySelector(".chat-messages").appendChild(div);
};

{
  /* <h2 id="room-name">Kit Kat</h2>
  <h3><sub><img src="https://img.icons8.com/color/25/000000/staff-skin-type-7.png"/></sub> Users</h3>
  <ul id="users">
    <li>Cherry</li>
    <li>Boo</li>
    <li>Chewy</li>
    <li>Moose</li>
  </ul>
*/
}

//add room name to DOM
const outputRoomName = (room) => {
  roomName.innerText = room;
};

//add users to DOM
const outputUsers = (users) => {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
};
