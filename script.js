
// form elements
const form = document.getElementById("custom-form");
const formBtn = document.getElementById("f-btn");
const formEmail = document.getElementById("f-email");
const formCountry = document.getElementById("f-country");
const formZipCode = document.getElementById("f-zipcode");
const formPassword = document.getElementById("f-password");
const formPasswordConfirm = document.getElementById("f-password_confirmation");

// errors css divs
const errorEmail = document.getElementById("error-email");
const errorCountry = document.getElementById("error-country");
const errorZipCode = document.getElementById("error-zipcode");
const errorPassword = document.getElementById("error-password");
const errorPasswordConfirm = document.getElementById("error-password-confirm");

form.addEventListener("submit", (event) => {
    alert("submitted");
    if (!formEmail.validity.valid) {
        showEmailError();
        event.preventDefault();
    }

    if (!formCountry.validity.valid) {
        showCountryError();
        event.preventDefault();
    }

    if (!formZipCode.validity.valid) {
        showZipCodeError();
        event.preventDefault();
    }

    if (!formPassword.validity.valid) {
        showPassword();
        event.preventDefault();
    }
});

formEmail.addEventListener("input", (event) => {
    if (formEmail.validity.typeMismatch) {
        formEmail.setCustomValidity("That's not an email bro");
    } else {
        formEmail.setCustomValidity("");
    }
});

function showEmailError() {
    if (formEmail.validity.valueMissing) {
        errorEmail.textContent = "You need to enter an email address";
    } else if (formEmail.validity.typeMismatch) {
        errorEmail.textContent = "Entered value needs to be an email address.";
    }
}

formCountry.addEventListener("input", (event) => {
})

function showCountryError() {

}

formZipCode.addEventListener("input", (event) => {

})

function showZipCode() {

}

formPassword.addEventListener("input", (event) => {

})