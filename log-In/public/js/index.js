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
  document.getElementById("chat_mensaje").value = "";
  socket.emit("new_msg", { nombre: nombre, msj: msj, date: formatted_date });
  return false;
}

function renderProducto(prod) {
  const html = prod
    .map(
      (elem) => `<tr>
      <th scope="col">${elem.nombre}</th>
      <th scope="col">${elem.precio}</th>
      <th scope="col"><img class="mb-4" src="${elem.logo}" alt="" width="50" height="50"/></th>
  </tr> `
    )
    .join(" ");
  document.getElementById("productos").innerHTML = html;
}

function enviarProducto(prod) {
  const nombreProd = document.getElementById("nombreProd").value;
  const precio = document.getElementById("precio").value;
  const logo = document.getElementById("logo").value;
  socket.emit("new_producto", {
    nombre: nombreProd,
    precio: precio,
    logo: logo,
  });
  return false;
}

socket.on("mensajes", (data) => {
  console.log(data);
  render(data);
});
socket.on("productos", (prod) => {
  renderProducto(prod);
});
