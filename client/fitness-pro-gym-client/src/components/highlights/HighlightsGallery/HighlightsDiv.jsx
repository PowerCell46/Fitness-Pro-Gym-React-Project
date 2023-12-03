import { Link } from "react-router-dom";


export function HighlightsDiv(props) {
    return(
        <div className="gallery-inner-box">
                {props.highlightsData.map((highlight) => (
                    <Link key={highlight._doc._id} to={`/highlights/${highlight._doc._id}`}>
                        <img src={`data:image/jpeg;base64,${highlight.photo}`} alt={`${highlight._doc.description}`}/>
                    </Link>
                ))
                }
        </div>
    );
}