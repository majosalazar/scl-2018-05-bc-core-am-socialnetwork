firebase.database().ref('messages')
  .limitToLast(10) // Filtro para no obtener todos los mensajes
  .once('value')
  .then((messages) => {
    JSON.stringify(messages);
  })
  .catch(() => {
  });

//Acá comenzamos a escuchar por nuevos mensajes usando el evento
//on child_added
firebase.database().ref('messages')
  .limitToLast(10)
  .on('child_added', (newMessage) => {
    const messageContainer = document.createElement('div')
    wallMessages.appendChild(messageContainer)
    messageContainer.innerHTML +=
      `<div style = "background-color: #E8910C" class="mb-3">
      <p class="m-0">Autor: ${newMessage.val().creatorName}</p>
      <p class="m-0">Mensaje<br>${newMessage.val().text}</p>
      <button class="btn" style="background-color:#E8910C" dataConvalidacion="${newMessage.key}"  onclick="starPost()">
      </button>
        <i class="fas fa-star p-1 pb-1"></i>
      <button class="btn" style="background-color:#E8910C" dataConvalidacion="${newMessage.key}"  onclick="editPost()">
        <i class="far fa-edit p-1 pb-1"></i>
      </button>
      <button class="btn" style="background-color:#E8910C" dataConvalidacion="${newMessage.key}"  onclick="deletePost()">
        <i class="fas fa-trash-alt p-1 pb-1"></i>
      </button> 
      </div>`;
  });

//Función para editar el mensaje.
function editPost() {
}

//Función para eliminar el mensaje.
function deletePost() {
  event.stopPropagation();
  let accept = confirm('¿Está seguro que quiere eliminar el post?');
  if (accept === true) {
    let keyPostToDelete = event.target.getAttribute('dataConvalidacion');
    firebase.database().ref('messages/').child(keyPostToDelete).remove();
  } else {
    alert('No se borró el mensaje.')
  };
}

//Función para adicionar estrellas.
function starPost() {

}

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