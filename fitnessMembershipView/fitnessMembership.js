function onLoadHtml() {
    const profilePicture = document.querySelector("#profilePicture");

    profilePicture.addEventListener("click", () => {
        const hiddenDiv = document.querySelector(".hidden-profile-view");
        
        if (Number(hiddenDiv.style.opacity) === 1) {
            hiddenDiv.style.opacity = 0;

        } else {
            hiddenDiv.style.opacity = 1;
        }
    });
}