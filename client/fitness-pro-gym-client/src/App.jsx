import {Route, Routes} from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/footer';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Error_404 } from './components/Error_404/Error_404';
import { SuccessfulOrder } from './components/SuccessfulOrder/SuccessfulOrder';


function App() {

    return (
        <>
            <Navigation/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='*' element={<Error_404/>}/>
                <Route path='/successfulOrder' element={<SuccessfulOrder/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
