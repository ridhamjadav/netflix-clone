export function initializeLanguage() {

    const select =
        document.getElementById(
            "languageSelect"
        );


    const title =
        document.getElementById(
            "heroTitle"
        );

    const subtitle =
        document.getElementById(
            "heroSubtitle"
        );

    const description =
        document.getElementById(
            "heroDescription"
        );


    select.addEventListener(
        "change",
        () => {

            if (select.value === "hi") {

                title.innerHTML =
                    "अनलिमिटेड फ़िल्में,<br>" +
                    "शो और बहुत कुछ";

                subtitle.textContent =
                    "₹149 से शुरू। कभी भी कैंसल करें।";

                description.textContent =
                    "देखने के लिए तैयार हैं? " +
                    "अपनी सदस्यता शुरू या फिर से शुरू करने के लिए " +
                    "अपना ईमेल डालें।";

            } else {

                title.innerHTML =
                    "Unlimited movies,<br>" +
                    "shows, and more";

                subtitle.textContent =
                    "Starts at ₹149. Cancel at any time.";

                description.textContent =
                    "Ready to watch? Enter your email " +
                    "to create or restart your membership.";

            }

        }
    );

}