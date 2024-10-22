const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-password");
const errorMessage = document.querySelector(".errorMessage");
const togglePassword = document.querySelector("#togglePassword");
const toggleConfirmPassword = document.querySelector("#toggleConfirmPassword");

const inputs = [email, phone, password, confirmPassword];

// Clean errors when field gets focused.
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

// Alternate visibility of the password input (from dots to text, like show/hide)
togglePassword.addEventListener("change", () => {
  password.type = togglePassword.checked ? "text" : "password";
});

// Alternate visibility of the password confirmation input (from dots to text, like show/hide)
toggleConfirmPassword.addEventListener("change", () => {
  confirmPassword.type = toggleConfirmPassword.checked ? "text" : "password";
});

// Verify is passwords match while being typed
password.addEventListener("input", checkPasswords);
confirmPassword.addEventListener("input", checkPasswords);

// Function to check if passwords do match.
function checkPasswords() {
  if (password.value !== confirmPassword.value) {
    password.classList.add("error");
    confirmPassword.classList.add("error");
    errorMessage.textContent = "Passwords don't match";
  } else {
    password.classList.remove("error");
    confirmPassword.classList.remove("error");
    errorMessage.textContent = ""; // Clean error message if focused.
  }
}

// Validate from when sent.
const submit = (e) => {
  e.preventDefault();

  // Verify is passwords match before being sent.
  if (password.value !== confirmPassword.value) {
    password.classList.add("error");
    confirmPassword.classList.add("error");
    errorMessage.textContent = "Passwords don't match";
    return;
  }

  // Validate password length.
  if (password.value.length < 8) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to be at least 8 characters long.";
    return;
  }

  // Verify if there is at least 1 lower case letter in password.
  if (!password.value.match(/[a-z]/)) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to have at least 1 lower case letter.";
    return;
  }

  // Verify if there is at least 1 upper case letter in password.
  if (!password.value.match(/[A-Z]/)) {
    password.classList.add("error");
    errorMessage.textContent =
      "Password needs to have at least 1 upper case letter.";
    return;
  }

  // Verify if password has at least 1 number.
  if (!password.value.match(/\d+/g)) {
    password.classList.add("error");
    errorMessage.textContent = "Password needs to have at least 1 number.";
    return;
  }

  // If all validations are passed, it is a success.
  errorMessage.textContent = "Form added successfully";
  
  // Restart the page after 25 seconds.
  setTimeout(() => {
    window.location.reload();
  }, 25000);
};

// Listen the submit event from the form.
const form = document.querySelector("form");
form.addEventListener("submit", submit);
