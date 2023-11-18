import "./login.css";

export function Login() {
    return (
    <main className="login-main">
        <div className="login-header">
            <h1 className="login-h1">Login</h1>
        </div>

        <p className="login-p err-message">Email is not valid!</p>
        <input type="text" name="email" placeholder="Email Address" className="login-input err-input-field"/>

        <p className="login-p err-message">Password is not valid!</p>
        <input type="password" name="password" placeholder="Password" className="login-input"/>

        <button className="login-button">LOGIN</button>
        <p className="login-p">NEW USER? <a href="../registerView/register.html">REGISTER</a></p>
    </main>
    );
}