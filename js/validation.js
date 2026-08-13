function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);
}


function validateForm(
    inputId,
    errorId
) {

    const input =
        document.getElementById(inputId);

    const error =
        document.getElementById(errorId);


    const email =
        input.value.trim();


    error.textContent = "";

    input.style.borderColor = "#888";


    if (email === "") {

        error.textContent =
            "Email address is required.";

        input.style.borderColor =
            "#e87c03";

        return false;
    }


    if (!isValidEmail(email)) {

        error.textContent =
            "Please enter a valid email address.";

        input.style.borderColor =
            "#e87c03";

        return false;
    }


    return true;
}


export function initializeValidation() {

    const heroForm =
        document.getElementById(
            "heroEmailForm"
        );

    const ctaForm =
        document.getElementById(
            "ctaEmailForm"
        );


    heroForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                validateForm(
                    "heroEmail",
                    "heroEmailError"
                )
            ) {

                alert(
                    "Email accepted. Continue to create your account."
                );

            }

        }
    );


    ctaForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (
                validateForm(
                    "ctaEmail",
                    "ctaEmailError"
                )
            ) {

                alert(
                    "Email accepted. Continue to create your account."
                );

            }

        }
    );

}