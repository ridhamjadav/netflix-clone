export function initializeFAQ() {

    const faqList =
        document.getElementById("faqList");


    faqList.addEventListener(
        "click",
        (event) => {

            const question =
                event.target.closest(
                    ".faq-question"
                );


            if (!question) return;


            const currentItem =
                question.closest(".faq-item");


            document
                .querySelectorAll(".faq-item")
                .forEach(item => {

                    if (item !== currentItem) {

                        item.classList.remove(
                            "active"
                        );

                    }

                });


            currentItem.classList.toggle(
                "active"
            );

        }
    );

}