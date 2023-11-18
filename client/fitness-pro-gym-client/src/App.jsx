import {Route, Routes} from 'react-router-dom';
import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Home/Home';
import { Footer } from './components/Footer/footer';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';


function App() {

    return (
        <>
            <Navigation/>

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>

            <Footer/>
        </>
    );
}

export default App;
