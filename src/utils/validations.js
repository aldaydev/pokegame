
//VALIDAR EL EMAIL
function validateEmail(email) {
    // Expresión regular para validar un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

//VALIDAR LA CONTRASEÑA
function validatePass(pass) {
    // Expresión regular para validar la contraseña
    //Debe contener al menos: 1 número, 1 letra, 1 caracter especial y >6 digitos
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!-_%*?&])[A-Za-z\d@$!-_%*?&]{6,}$/;
    return regex.test(pass);
}

export {validateEmail, validatePass};