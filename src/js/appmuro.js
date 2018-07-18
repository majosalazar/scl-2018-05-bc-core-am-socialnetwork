  firebase.database().ref('messages')
  .limitToLast(20) // Filtro para no obtener todos los mensajes
  .once('value')
  .then((messages)=>{
      console.log("Mensajes > "+JSON.stringify(messages));
  })
  .catch(()=>{

  });

//Acá comenzamos a escuchar por nuevos mensajes usando el evento
//on child_added
firebase.database().ref('messages')
  .limitToLast(20)
  .on('child_added', (newMessage)=>{
      messageContainer.innerHTML += `
          <p>Nombre : ${newMessage.val().creatorName}</p>
          <p>${newMessage.val().text}</p>
      `;
  });

//Función para mandar mensajes
function sendMessage(){
  const currentUser = firebase.auth().currentUser;
  const messageAreaText = messageArea.value;

  //Para tener una nueva llave en la colección messages
  const newMessageKey = firebase.database().ref().child('messages').push().key;

  firebase.database().ref(`messages/${newMessageKey}`).set({
      creator : currentUser.uid,
      creatorName : currentUser.displayName,
      text : messageAreaText
  });
}

function writeNewPost(){ 
  if (messageDiv.className.indexOf("menu_closed") >= 0) {
    openMessage();
  } else {
    closeMessage();
  }
}

function openMessage() {
  messageDiv.classList.remove('menu_closed'); //Se quita la clase display-none para que se vea.
  messageDiv.classList.add('menu_open');
}

function closeMessage() {
  messageDiv.classList.add('menu_closed'); //Se añade la clase display-none para que se oculte.
  messageDiv.classList.remove('menu_open');
}