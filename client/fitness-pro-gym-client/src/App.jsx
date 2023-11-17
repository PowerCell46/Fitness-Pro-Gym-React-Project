import {Route, Routes} from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import { Navigation } from './components/Navigation/Navigation'
import { Home } from './components/Home/Home';
import { Login } from './components/Login';
import { Footer } from './components/Footer/footer';

function App() {
  const [count, setCount] = useState(0)

return (
    <>
        <Navigation/>

        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>

        <Footer/>
    </>
)
}

export default App
