firebase.database().ref('messages')
  .limitToLast(10) // Filtro para no obtener todos los mensajes
  .once('value')
  .then((messages) => {
    console.log("Mensajes > " + JSON.stringify(messages));
  })
  .catch(() => {

  });

//Acá comenzamos a escuchar por nuevos mensajes usando el evento
//on child_added
firebase.database().ref('messages')
  .limitToLast(10)
  .on('child_added', (newMessage) => {
    messageContainer.innerHTML += `
          <p>Nombre : ${newMessage.val().creatorName}</p>
          <p>${newMessage.val().text}</p>
      `;
  });

//Función para mandar mensajes y ocultar el div del mensaje.
function sendMessage() {
  if (messageBox.value !== "") {
    messageDiv.style.display = "none";
    const currentUser = firebase.auth().currentUser;
    const messageAreaText = messageBox.value;

    //Para tener una nueva llave en la colección messages.
    const newMessageKey = firebase.database().ref().child('messages').push().key;

    firebase.database().ref(`messages/${newMessageKey}`).set({
      creator: currentUser.uid,
      creatorName: currentUser.displayName,
      text: messageAreaText
    });
  } else {
    alert('No puedes subir un mensaje en blanco.')
  }
}

//Aparece el div para escribir el mensaje.
function writeNewPost() {
  messageDiv.style.display = "block";
}

//Desaparece el div para escribir el mensaje.
function cancelMessage() {
  messageDiv.style.display = "none";
}