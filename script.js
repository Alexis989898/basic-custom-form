
// form elements
const form = document.getElementById("custom-form");
const formBtn = document.getElementById("f-btn");
const formEmail = document.getElementById("f-email");
const formCountry = document.getElementById("f-country");
const formZipCode = document.getElementById("f-zipcode");
const formPassword = document.getElementById("f-password");
const formPasswordConfirm = document.getElementById("f-password_confirm");

// errors css divs
const errorEmail = document.getElementById("error-email");
const errorCountry = document.getElementById("error-country");
const errorZipCode = document.getElementById("error-zipcode");
const errorPassword = document.getElementById("error-password");
const errorPasswordConfirm = document.getElementById("error-password_confirm");

// General error handling
function showFieldError(field, errorElement, validityChecks) {
    let errorMessage = "";

    if (field.validity.valueMissing) {
        errorMessage = validityChecks.valueMissing;
    } else if (field.validity.typeMismatch) {
        errorMessage = validityChecks.typeMismatch;
    } else if (field.validity.tooShort) {
        errorMessage = validityChecks.tooShort;
    } else if (validityChecks.customValidation && !validityChecks.customValidation()) {
        errorMessage = validityChecks.customErrorMessage;
    }

    errorElement.textContent = errorMessage;
    field.setCustomValidity(errorMessage);
}

// Submit event handling
form.addEventListener("submit", (event) => {
    let isValid = true;

    if (!formEmail.validity.valid) {
        showFieldError(formEmail, errorEmail, {
            valueMissing: "You need to enter an email address",
            typeMismatch: "Entered value needs to be an email address"
        });
        isValid = false;
        event.preventDefault();
    }

    if (!formCountry.validity.valid || !countriesList.includes(formCountry.value)) {
        showFieldError(formCountry, errorCountry, {
            valueMissing: "You need to enter your Country",
            customValidation: () => countriesList.includes(formCountry.value),
            customErrorMessage: "Choose a valid country from the list"
        });
        isValid = false;
        event.preventDefault();
    }

    if (!formZipCode.validity.valid) {
        showFieldError(formZipCode, errorZipCode, {
            valueMissing: "You need to enter your Zip Code"
        });
        isValid = false;
        event.preventDefault();
    }

    if (!formPassword.validity.valid) {
        showFieldError(formPassword, errorPassword, {
            valueMissing: "You need to enter a password",
            tooShort: "Your password must contain at least 12 characters"
        });
        isValid = false;
        event.preventDefault();
    }

    if (formPasswordConfirm.value !== formPassword.value) {
        showFieldError(formPasswordConfirm, errorPasswordConfirm, {
            customValidation: () => formPasswordConfirm.value === formPassword.value,
            customErrorMessage: "The password and confirmation are different"
        });
        isValid = false;
        event.preventDefault();
    }

    if (isValid) {
        const successMessage = document.getElementById("submit-message");
        successMessage.classList.add("show") // Show the message
    
        // Automatically hide it after a few seconds
        setTimeout(() => {
            successMessage.classList.remove("show"); // Hide the message
        }, 3000); // Display duration
    }
    event.preventDefault();
});



// Input handlers

formEmail.addEventListener("input", () => {
    if (!formEmail.validity.valid) {
        showFieldError(formEmail, errorEmail, {
            valueMissing: "You need to enter an email address",
            typeMismatch: "Entered value needs to be an email address"
        });
    } else {
        errorEmail.textContent = "";
        formEmail.setCustomValidity(""); // Clear custom validity
    }
});

formCountry.addEventListener("input", () => {
    if (!formCountry.validity.valid || !countriesList.includes(formCountry.value)) {
        showFieldError(formCountry, errorCountry, {
            valueMissing: "You need to enter your Country",
            customValidation: () => countriesList.includes(formCountry.value),
            customErrorMessage: "Choose a valid country from the list"
        });
    } else {
        errorCountry.textContent = "";
        formCountry.setCustomValidity("");
    }
});

formZipCode.addEventListener("input", () => {
    if (!formZipCode.validity.valid) {
        showFieldError(formZipCode, errorZipCode, {
            valueMissing: "You need to enter you Zip Code"
        });
    } else {
        errorZipCode.textContent = "";
        formZipCode.setCustomValidity("");
    }
});

formPassword.addEventListener("input", () => {
    if (!formPassword.validity.valid) {
        showFieldError(formPassword, errorPassword, {
            valueMissing: "You need to enter a password",
            tooShort: "Your password must contain at least 12 characters"
        });
    } else {
        errorPassword.textContent = "";
        formPassword.setCustomValidity("");
    }
});

formPasswordConfirm.addEventListener("input", () => {
    if (formPasswordConfirm.value !== formPassword.value) {
        showFieldError(formPasswordConfirm, errorPasswordConfirm, {
            customValidation: () => formPasswordConfirm.value === formPassword.value,
            customErrorMessage: "The password and confirmation are different"
        });
    } else {
        errorPasswordConfirm.textContent = "";
        formPasswordConfirm.setCustomValidity("");
    }
});


//CSS for untouched inputs
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.classList.add('untouched');

    input.addEventListener('input', () => {
        input.classList.remove('untouched');
    });
});

// Creating datalist of countries in HTML
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        let datalist = document.getElementById('countries');
        data.forEach(country => {
            let option = document.createElement('option');
            option.value = country.name;
            datalist.appendChild(option);
        });
    });

// Storing countries in a variable
let countriesList = [];
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        countriesList = data.map(country => country.name);
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
    });