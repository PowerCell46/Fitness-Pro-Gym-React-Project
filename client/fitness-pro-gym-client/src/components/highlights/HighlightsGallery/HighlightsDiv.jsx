import { Link } from "react-router-dom";

export function HighlightsDiv(props) {
    return(
        <div className="gallery-inner-box">
                {props.highlightsData.map((highlight) => (
                    <Link key={highlight._id} to={`/highlights/${highlight._id}`}>
                        <img src={`data:image/jpeg;base64,${highlight.photo}`} alt={`${highlight.description}`}/>
                    </Link>
                ))
                }
        </div>
    );
}