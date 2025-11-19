import { Link } from "react-router-dom";
import './main.css'

export default function Projects() {
  return (
    <>
      <h1> projects </h1>
        <p>(engineering)</p>
        <div className="room-container">
            <Link to="/projects-fun" className="nav-button">&lt;</Link>
            <br />
            <Link to="/about" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}