export function fakeButtonHandler(e) {
    e.preventDefault();
    document.querySelector(".file-upload").click();
}


export function realButtonHandler() {
    const realFileButton = document.querySelector(".file-upload");
    const spanFile = document.querySelector(".file-upload-div span");
    if (realFileButton.value) {
        spanFile.textContent= realFileButton.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        spanFile.style.color = "#007760";
        spanFile.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
 
    } else {
        spanFile.textContent = 'No file chosen';
    }
}