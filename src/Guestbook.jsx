import { Link } from "react-router-dom";
import './main.css'

export default function Guestbook() {
  return (
    <>
      <h1> Iris's Guestbook</h1>
        <p> garden </p>
        <p>leave your name in my corner of the internet !</p>
        <div className="room-container">
            <Link to="/about" class="nav-button">Back Inside</Link>
            <br/>
        </div>
    </>
  )
}