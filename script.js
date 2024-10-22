const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const errorMessage = document.querySelector(".errorMessage");
const togglePassword = document.querySelector("#togglePassword");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");

const inputs = [email, phone, password, confirmPassword];

// Limpiar errores cuando el campo recibe el foco
inputs.forEach((item) => {
  item.addEventListener("focusin", () => {
    errorMessage.textContent = "";
    item.classList.remove("error");
    if (item === password || item === confirmPassword) {
      password.classList.remove("error");
      confirmPassword.classList.remove("error");
    }
  });
});

// Alternar visibilidad de la contraseña principal
togglePassword.addEventListener("change", () => {
  password.type = togglePassword.checked ? "text" : "password";
});

// Alternar visibilidad de la confirmación de contraseña
toggleConfirmPassword.addEventListener("change", () => {
  confirmPassword.type = toggleConfirmPassword.checked ? "text" : "password";
});

// Verificar si las contraseñas coinciden mientras se escriben
password.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);

function checkPasswords() {
  if (password.value !== confirmPassword.value) {
    password.classList.add("error");
    confirmPassword.classList.add("error");
    errorMessage.textContent = "Passwords don't match";
  } else {
    password.classList.remove("error");
    confirmPassword.classList.remove("error");
    errorMessage.textContent = ""; // Limpiar el mensaje de error si coinciden
  }
}

// Validar el formulario cuando se envía
const submit = (e) => {
  e.preventDefault();

  // Verificar si las contraseñas coinciden antes de enviar
  if (password.value !== confirmPassword.value) {
    password.classList.add("error");
    confirmPassword.classList.add("error");
    errorMessage.textContent = "Passwords don't match";
    return;
  }

  // Validar número de teléfono
  if (
    !phone.value.match(
      /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})/
    )
  ) {
    phone.classList.add("error");
    errorMessage.textContent = "Phone number needs to be exactly 10 numbers";
    return;
  }

  // Validar longitud de la contraseña
  if (password.value.length < 8) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to be at least 8 characters long.";
    return;
  }

  // Verificar si la contraseña tiene al menos una letra minúscula
  if (!password.value.match(/[a-z]/)) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to have at least 1 lower case letter.";
    return;
  }

  // Verificar si la contraseña tiene al menos una letra mayúscula
  if (!password.value.match(/[A-Z]/)) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to have at least 1 upper case letter.";
    return;
  }

  // Verificar si la contraseña tiene al menos un número
  if (!password.value.match(/\d+/g)) {
    password.classList.add("error");
    errorMessage.textContent = "Password needs to have at least 1 number.";
    return;
  }

  // Si todas las validaciones son correctas
  errorMessage.textContent = "Form added successfully";
  
  // Reiniciar la página después de 5 segundos
  setTimeout(() => {
    window.location.reload();
  }, 5000);
};

// Escuchar el evento submit del formulario
const form = document.querySelector("form");
form.addEventListener("submit", submit);
