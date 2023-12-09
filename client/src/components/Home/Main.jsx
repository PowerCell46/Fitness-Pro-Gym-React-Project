import "./home.css";


export function Main(props) {
    return (
        <main className={props.background}>
            {props.reverse ? 
            <> 
                <div className="image-wrapper">
                    <img src={props.img} alt=""/>
                </div>
                <h2><span>{props.roomTitle}</span> <br/> {props.roomDesc}</h2>
            </>:
            <>
                <h2><span>{props.roomTitle}</span> <br/> {props.roomDesc}</h2>
                <div className="image-wrapper">
                    <img src={props.img} alt=""/>
                </div>
            </>
            }
        </main>
    );
}