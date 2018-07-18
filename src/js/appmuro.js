  firebase.database().ref('messages')
  .limitToLast(5) // Filtro para no obtener todos los mensajes
  .once('value')
  .then((messages)=>{
      console.log("Mensajes > "+JSON.stringify(messages));
  })
  .catch(()=>{

  });

//Acá comenzamos a escuchar por nuevos mensajes usando el evento
//on child_added
firebase.database().ref('messages')
  .limitToLast(1)
  .on('child_added', (newMessage)=>{
      messageContainer.innerHTML += `
          <p>Nombre : ${newMessage.val().creatorName}</p>
          <p>${newMessage.val().text}</p>
      `;
  });

wall = () => {
  profile.style.display = "none";
  wallDisplay.style.display = "block";
}

articles = () => {
  profile.style.display = "none";
  articlesDisplay.style.display = "block";
}

professionalSupport = () => {
  profile.style.display = "none";
  professionalSupportDisplay.style.display = "block";
}

talks = () => {
  profile.style.display = "none";
  talksDisplay.style.display = "block";
}

complaints = () => {
  profile.style.display = "none";
  complaintsDisplay.style.display = "block";
}

function writeNewPost() {
  messageDiv.style.display = "block";
}

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

/*function writeNewPost(uid, username, picture, title, body) {
  //Aquí se muestran los datos del post y su autor.
  const postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  //Con ésto se obtiene una nueva llave para un nuevo mensaje.
  let newPostKey = firebase.database().ref().child('posts').push().key;

  //Ésta parte es para que el usuario pueda escribir el mensaje simultaneamente con las listas de posts y las listas de posts de otros usuarios.
  let updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
}

//Ésta función lleva la cuenta de las estrellas.
function toggleStar(postRef, uid) {
  postRef.transaction(function (post) {
    if (post) {
      if (post.stars && post.stars[uid]) {
        post.starCount--;
        post.stars[uid] = null;
      } else {
        post.starCount++;
        if (!post.stars) {
          post.stars = {};
        }
        post.stars[uid] = true;
      }
    }
    return post;
  });
https://firebase.google.com/docs/database/web/read-and-write?hl=es-419}*/