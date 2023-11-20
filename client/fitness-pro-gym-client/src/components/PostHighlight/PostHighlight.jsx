import { useContext } from "react";
import { CreateContext } from "../../contexts/CreateContext";
import "./postHighlight.css";


export function PostHighlight() {
    const {postHighlightSubmitHandler} = useContext(CreateContext);

    return (
    <main className="main-post-highlight">
        <h1>Post a Highlight</h1>
        <form onSubmit={postHighlightSubmitHandler}>
            <p id="post-highlight-image-err-p" className="err-message">The file can be either with JPG or PNG extension!</p>
            <input type="file" className="file-upload" hidden="hidden" name="image" onChange={postHighlightRealButtonHandler}/>
           
            <div className="file-upload-div">
                <button id="post-highlight-image" onClick={postHighlightFakeButtonHandler}>Choose a file</button>
                <span id="post-highlight-span">No file chosen</span>
            </div>
          
            <input type="text" name="description" placeholder="Average Arm day pump"/>
         
            <button>Post</button>
        </form>
    </main>
    );
}


function postHighlightFakeButtonHandler(e) {
    e.preventDefault();
    document.querySelector(".file-upload").click();
}


function postHighlightRealButtonHandler() {
    const realFileButton = document.querySelector(".file-upload");
    const spanFile = document.querySelector(".file-upload-div span");
    if (realFileButton.value) {
        spanFile.textContent= realFileButton.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        spanFile.style.color = "#007760";
        spanFile.style.backgroundColor = "rgba(255, 255, 255, 0.5)"
    } else {
        spanFile.textContent = 'No file chosen';
    }
}