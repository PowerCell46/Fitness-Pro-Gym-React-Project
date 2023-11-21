import "./postTrainer.css";
import { useContext } from "react";
import { TrainerContext } from "../../contexts/TrainerContext";


export function PostTrainer() {
    const {postTrainerSubmitHandler} = useContext(TrainerContext);

    return (
        <main className="post-trainer-main">
            <h1>Add A Trainer</h1>
            <form onSubmit={postTrainerSubmitHandler}>
                
                <p id="post-trainer-image-err-p" className="err-message">File format not available!</p>
                <input name="image" type="file" className="file-upload" hidden="hidden" onChange={postTrainerRealButtonHandler}/>
                <div className="file-upload-div">
                    <button id="post-trainer-image" onClick={postTrainerFakeButtonHandler}>Choose a file</button>
                    <span id="post-trainer-span">No file chosen</span>
                </div>
                
                <p id="post-trainer-name-err-p" className="err-message">Name is not valid!</p>
                <input id="post-trainer-name" type="text" name="name" placeholder="Jeff Nippard"/>
                
                <p id="post-trainer-email-err-p" className="err-message">Email is not valid!</p>
                <input id="post-trainer-email" type="text" name="email" placeholder="info@jeffnippard.com"/>
                
                <p id="post-trainer-phoneNumber-err-p" className="err-message">Phone number is not valid!</p>
                <input id="post-trainer-phoneNumber" type="number" name="phoneNumber" placeholder="+359 2 XXX XXXX"/>
                
                <button>Post</button>
                
            </form>
        </main>
    );
}


function postTrainerFakeButtonHandler(e) {
    e.preventDefault();
    document.querySelector(".file-upload").click();
}


function postTrainerRealButtonHandler() {
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