//base de datos de usurios para mostrar en el perfil
function users() {
  const currentUser = firebase.auth().currentUser;
  const inputEmail = 'hola';
  //const inputAlumno =
  //const inputCurso =

  //nueva llave para la coleccion de datos
  const newProfile = firebase.database().ref().child(`userProfile`).push().key;

  firebase.database().ref(`userProfile/${newProfile}`).set({
    usuario : currentUser.displayName,
    email : inputEmail,
    //alumno : inputAlumno,
    //curso : inputCurso
    
  });
}
