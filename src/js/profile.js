//base de datos de usurios para mostrar en el perfil
function users() {
  const currentUser = firebase.auth().currentUser;
  const inputEmail = 'hola';
  //const inputAlumno =
  //const inputCurso =

  //nueva llave para la coleccion de datos
  const newProfile = firebase.database().ref().child(`userProfile`).push().key;

  firebase.database().ref(`userProfile/${newProfile}`).set({
    usuario: currentUser.displayName,
    email: inputEmail,
    //alumno : inputAlumno,
    //curso : inputCurso

  });
}

//Sección profile
firebase.auth().onAuthStateChanged(function (user) {
  if (user != null) {
    secProfile.style.display = "block";
    userData.innerHTML = `
    <img src="${user.photoURL}" alt="foto de perfil del usuario">
    <p>${(user.displayName)}</p>
    <p>${(user.emailVerified)}</p>`
  }
});
