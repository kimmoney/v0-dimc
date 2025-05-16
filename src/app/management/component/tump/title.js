import "./title.css";
export default function Title(props) {
    return (
        <div>
        <h1 className="title">{props.title}</h1>
        </div>
    );
}