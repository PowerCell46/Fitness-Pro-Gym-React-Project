import "./Error_404.css";
import { Link } from "react-router-dom";

export function Error_404() {
    return (
        <main className="err-main">
            <img src="https://media.tenor.com/HQtSqOwX3akAAAAd/larry-wheels-eating.gif" alt=""/>
            <h1>ERROR 404</h1>
            <h2>Page Not Found!</h2>
            <Link to={'/'}><button>Back To Home</button></Link>
        </main>
    )
}