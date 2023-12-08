import './successfulOrder.css';
import { Link } from 'react-router-dom';


export function SuccessfulOrder() {
    return (
        <main className='successful-order-main'>
            <img src="https://i.pinimg.com/736x/2b/53/0d/2b530d0302e87d964541b0765ec5f52b.jpg" alt="Successful Order Image"/>
            <h1>Successful Order!</h1>
            <Link to='/'><button>Back To Home</button></Link>
        </main>
    );
}