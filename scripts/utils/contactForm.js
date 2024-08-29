function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    clearForm();
}

function clearForm() {
    const form = document.getElementById("contact_form");
    form.reset();
    clearErrors();
}

function validateForm(firstName, lastName, email, message, form) {

    let isValid = true;

    clearErrors();

    if (firstName.trim() === "") {
        showError("first_name", "Le prénom est requis.");
        isValid = false;
    }

    if (lastName.trim() === "") {
        showError("last_name", "Le nom est requis.");
        isValid = false;
    }

    if (email.trim() === "") {
        showError("email", "L'email est requis.");
        isValid = false;
    } else if (!validateEmail(email)) {
        showError("email", "L'email n'est pas valide.");
        isValid = false;
    }

    if (message.trim() === "") {
        showError("message", "Le message est requis.");
        isValid = false;
    }

    return isValid;
}

function showError(field, message) {
    const errorElement = document.getElementById(`${field}_error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }
}

function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    errorElements.forEach(element => {
        element.textContent = "";
        element.style.display = "none";
    });
}

function validateEmail(email) {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return isValid.test(email);
}

function submitForm(event) {
    event.preventDefault();
    const form = document.getElementById("contact_form");
    const firstName = form.elements["first_name"].value;
    const lastName = form.elements["last_name"].value;
    const email = form.elements["email"].value;
    const message = form.elements["message"].value;

    if (validateForm(firstName, lastName, email, message, form)) {
        console.log(`Formulaire envoyé avec succès ! \nNom: ${lastName} \nPrénom: ${firstName} \nEmail: ${email} \nMessage: ${message}`);
        closeModal();
    }
}

document.getElementById("contact_form").addEventListener("submit", submitForm);
document.querySelector(".contact_button").addEventListener("click", displayModal);
document.getElementById("contact_modal__close_modal").addEventListener("click", closeModal);
