import "./resgister.css";

export function Register() {
    return (
        <main className="register-main">
       
        <h1>Register</h1>
        
        <form method="POST">
            <p className="err-message">Email is not valid!</p>
            <input type="text" name="email" placeholder="Email" className="err-input-field"/>

            <p className="err-message">Username is not valid!</p>
            <input type="text" name="username" placeholder="Username"/>

            <p className="err-message">Password is not valid!</p>
            <input type="password" name="password" placeholder="Password"/>

            <p className="err-message">Re-Password doesn't match!</p>
            <input type="password" name="repeatPassword" placeholder="Repeat Password"/>

            <button>Register</button>
        </form>

        <p>Already have an account? <a href="../loginView/login.html">Login now</a></p>
    </main>
    );
}