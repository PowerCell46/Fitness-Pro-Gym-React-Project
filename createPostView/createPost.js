function fileHandlerFunction() {
    const realFileButton = document.querySelector(".file-upload");
    const fakeFileButton = document.querySelector(".file-upload-div button");
    const spanFile = document.querySelector(".file-upload-div span");

    fakeFileButton.addEventListener("click", (e) => {
        e.preventDefault()
        console.log("clicked");
        realFileButton.click();        
    });

    realFileButton.addEventListener("change", () => {
        if (realFileButton.value) {
            spanFile.textContent= realFileButton.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
            spanFile.style.color = "#007760";
            spanFile.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
        } else {
            spanFile.textContent = 'No file chosen';
        }
    });
    
}