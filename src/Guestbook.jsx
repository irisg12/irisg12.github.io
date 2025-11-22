import { Link } from "react-router-dom";
import './main.css'

import garden from "./assets/garden.png"
import letter from "./assets/letter.png"
import mailDoor from "./assets/mail_door.png"
import mailFlag from "./assets/mail_flag.png"


export default function Guestbook() {
  return (
    <>
      <h1> Iris's Guestbook</h1>
        <p> garden , leave your name in my corner of the internet !</p>
        <div className="room-container" style={{backgroundImage: `url(${garden})`}}>
            <Link to="/about" className="nav-button">Back Inside</Link>
            <br/>
        </div>
    </>
  )
}