import { Link } from "react-router-dom";
import './main.css'

export default function PicGarden() {
  return (
    <>
      <h1> pics</h1>
        <p> pics that mean something to me (living room)  </p>
        <div className="room-container">
            <Link to="/about" className="nav-button">&lt;</Link>
            <br />
            <Link to="/projects-fun" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}