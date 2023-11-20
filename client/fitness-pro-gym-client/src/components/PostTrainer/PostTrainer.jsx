import "./postTrainer.css";

export function PostTrainer() {
    return (
    <main className="post-highlight-main">
        <h1>Add A Trainer</h1>
        <form method="POST">
            <input type="file" className="file-upload" hidden="hidden"/>
            <div className="file-upload-div">
                <button>Choose a file</button>
                <span>No file chosen</span>
            </div>
            <p className="err-message">Trainer Name must be at least 5 characters!</p>
            <input type="text" name="name" placeholder="Jeff Nippard" className="err-input-field"/>
            <p className="err-message">Email is not valid!</p>
            <input type="text" name="email" placeholder="info@jeffnippard.com"/>
            <p className="err-message">Phone number is not valid!</p>
            <input type="text" name="email" placeholder="+359 2 XXX XXXX"/>
            <button>Post</button>
        </form>
    </main>

    );
}
