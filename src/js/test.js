//Test para ver si login funciona. Especificaciones del largo y la existencia de la clave, si hay o no email.
//Parte del test para ver si efectivamente se crea la cuenta con los dados correctos dados. Debe dar verdadero.
Description('Debe crear una cuenta con mail y password dados', () => {
  it('Debe dar verdadero para email y clave dados', () => {
    const email = 'test@test.com';
    const password = '123456';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, true);
    assert.equal(result.message, '');
  });
  //Parte del test que ve si se puede crear un user sin clave. Debe dar falso.
  it('Debe dar falso para la ausencia de clave', () => {
    const email = 'test@test.com';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Hay datos vacíos');
  });
  //Parte del test que ve si se puede crear un user sin email. Debe dar falso.
  it('Debe dar falso para la ausencia del email', () => {
    const email = '';
    const password = '12345678';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Hay datos vacíos');
  });
  //Parte del test que ve si se puede crear un user sin email y sin clave. Debe dar falso.
  it('Debe dar falso para la ausencia de ambos datos', () => {
    const email = '';
    const password = '';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Hay datos vacíos');
  });
  //Parte del test que ve si se puede crear un user con una clave demasiado corta. Debe dar falso.
  it('Debe dar falso para una clave menor a 6 carácteres', () => {
    const email = 'test@test.com';
    const password = '123';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Contraseña demasiado corta');
  });
  //Parte del test que ve si se puede crear un user con un formato de email incorrecto. Debe dar falso.
  it('Debe dar falso si el mail no tiene un formato correcto', () => {
    const email = 'test.com';
    const password = '123456';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Debe ingresar un mail válido');
  });
  //Parte del test que ve si se puede crear un user con un formato de email y clave incorrectos. Debe dar falso.
  it('Debe dar falso si ambos tienen un formato incorrecto', () => {
    const email = 'test.com';
    const password = '123';
    const result = window.controller.validateLogin(email, password);
    assert.equal(result.valid, false);
    assert.equal(result.message, 'Debe ingresar datos válidos');
  });
})