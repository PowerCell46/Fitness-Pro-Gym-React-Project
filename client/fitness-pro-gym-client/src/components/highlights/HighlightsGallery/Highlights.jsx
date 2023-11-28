import { useEffect, useState, useContext } from "react";
import { AuthenticationContext } from "../../../contexts/AuthenticationContext";
import "./highlights.css";
import { HighlightsDiv } from "./HighlightsDiv";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { errorToastMessage } from "../../../utils/toastify";


export function Highlights() {
    const {navigate} = useContext(AuthenticationContext);
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        async function fetchHighlightsData() {
            try {
                var response = await fetch("http://localhost:5000/highlights");
                
                if (response.status !== 200) {
                    const errorData = await response.json();

                    errorToastMessage(errorData.error);

                    return navigate('/404'); 
                }

            } catch {
                navigate("/404");
            }
            
            const data = await response.json();
            
            setHighlightsData(data);
        }

        fetchHighlightsData();
    }, []);

    return (
        <main className="highlights-main">
            <ToastContainer />
            <h1>Pro Gym Highlights</h1>

            <div className="gallery-div">
            
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => index % 3 == 0)}/>
                
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => (index + 1) % 3 == 0)}/>
                
                <HighlightsDiv highlightsData={highlightsData.filter((el, index) => (index + 2) % 3 == 0)}/>
                
            </div>
        </main>
    );
}