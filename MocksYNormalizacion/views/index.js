const socket = io.connect();

function render(data) {
  const html = data
    .map(
      (msg) => `<li class="clearfix">
  <div class="message-data">
    <span class="message-data-time">${msg.nombre}</span><span id="date">${msg.date}</span>
  </div>
  <div class="message my-message">${msg.msj}</div>
  </li>`
    )
    .join(" ");
  document.getElementById("mensajes").innerHTML = html;
}

function enviarMensaje(event) {
  const current_datetime = new Date();
  const formatted_date =
    current_datetime.getFullYear() +
    "-" +
    (current_datetime.getMonth() + 1) +
    "-" +
    current_datetime.getDate() +
    " " +
    current_datetime.getHours() +
    ":" +
    current_datetime.getMinutes() +
    ":" +
    current_datetime.getSeconds();
  const nombre = document.getElementById("nombre").value;
  const msj = document.getElementById("chat_mensaje").value;
  console.log("tu vieja"); // CRUCIAL EL PORQUE NO HAY
  const id = document.getElementById("id").value;
  console.log("tu vieja 2"); // CRUCIAL EL PORQUE NO HAY
  const apellido = document.getElementById("apellido").value;
  const edad = document.getElementById("edad").value;
  const alias = document.getElementById("alias").value;
  const avatar = document.getElementById("avatar").value;
  document.getElementById("chat_mensaje").value = "";
  socket.emit("new_msg", {
    author: {
      nombre: nombre,
      date: formatted_date,
      id: id,
      apellido: apellido,
      edad: edad,
      alias: alias,
      avatar: avatar,
    },
    msj: msj,
  });
  return false;
}

socket.on("mensajes", (data) => {
  console.log(data);
  render(data);
});
