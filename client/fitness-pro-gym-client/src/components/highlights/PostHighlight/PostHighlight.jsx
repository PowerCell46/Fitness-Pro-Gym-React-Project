import { useContext } from "react";
import { HighlightContext } from "../../../contexts/HighlightContext";
import "./postHighlight.css";
import { fakeButtonHandler, realButtonHandler } from "../../../utils/fakeBtnRealBtn";
import { GlobalContext } from "../../../contexts/GlobalContext";

export function PostHighlight() {
    const {navigate, errorToastMessage} = useContext(GlobalContext);
    const {postHighlightSubmitHandler} = useContext(HighlightContext);

    return (
        <main className="main-post-highlight">
            <h1>Post a Highlight</h1>
            <form onSubmit={(e) => postHighlightSubmitHandler(e, navigate, errorToastMessage)}>
                <p id="post-highlight-image-err-p" className="err-message">File format not available!</p>
                <input type="file" className="file-upload" hidden="hidden" name="image" onChange={realButtonHandler}/>
            
                <div className="file-upload-div">
                    <button id="post-highlight-image" onClick={fakeButtonHandler}>Choose a file</button>
                    <span id="post-highlight-span">No file chosen</span>
                </div>
            
                <input type="text" name="description" placeholder="Average Arm day pump"/>
            
                <button>Post</button>
            </form>
        </main>
    );
}
