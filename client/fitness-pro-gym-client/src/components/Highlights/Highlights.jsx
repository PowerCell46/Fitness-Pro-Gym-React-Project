import { useEffect, useState } from "react";
import "./highlights.css";


export function Highlights() {
    const [highlightsData, setHighlightsData] = useState([]);

    useEffect(() => {
        async function fetchHighlightsData() {
            const response = await fetch("http://localhost:5000/highlights");
            if (!response.ok) {
                console.log(response); // probably not right
                // navigate
            }
            const data = await response.json();
            console.log(data);
            setHighlightsData(data);
        }

        fetchHighlightsData();
    }, []);

    return (
    <main className="highlights-main">
        <h1>Pro Gym Highlights</h1>

        <div className="gallery-div">
        
            <div className="gallery-inner-box">
                {highlightsData.map((highlight) => (
                    <img key={highlight._id} src={`data:image/jpeg;base64,${highlight.photo}`} alt="" />    
                ))}
            </div>

            {/* <div className="gallery-inner-box">
                <img src="../../../public/images/images/364538988_215016618201450_9064104799704686842_n.jpg" alt=""/>
                <img src="../../../public/images/images/a.png" alt=""/>
                <img src="../../../public/images/images/b.PNG" alt=""/>
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/IMG_20230504_160221_121.jpg" alt=""/>
                <img src="../../../public/images/images/received_782141073155761.jpeg" alt=""/>
                <img src="../../../public/images/images/Screenshot_20230712_224319_Instagram.jpg" alt=""/>
            </div> */}

            {/* <div className="gallery-inner-box">
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/received_782141073155761.jpeg" alt=""/>
                <img src="../../../public/images/images/Screenshot_20230712_224319_Instagram.jpg" alt=""/>
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/IMG_20230504_160221_121.jpg" alt=""/>
                <img src="../../../public/images/images/received_782141073155761.jpeg" alt=""/>
                <img src="../../../public/images/images/Screenshot_20230712_224319_Instagram.jpg" alt=""/>
            </div>

            <div className="gallery-inner-box">
                <img src="../../../public/images/images/b.PNG" alt=""/>
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/b.PNG" alt=""/>
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/b.PNG" alt=""/>
                <img src="../../../public/images/images/c.PNG" alt=""/>
                <img src="../../../public/images/images/IMG_20230504_160221_121.jpg" alt=""/>
                <img src="../../../public/images/images/Screenshot_20230712_224319_Instagram.jpg" alt=""/>
            </div> */}

        </div>
    </main>
    );
}