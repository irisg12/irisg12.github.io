import { Link } from "react-router-dom";
import './main.css'

import livingRoom from "./assets/room_living.png"
import plant from "./assets/plant.png"
import thread from "./assets/thread.png"

export default function PicGarden() {
  return (
    <>
      <h1> pics</h1>
        <p> pics that mean something to me (living room)  </p>
        <div className="room-container" style={{backgroundImage: `url(${livingRoom})`}}>
            <Link to="/about" className="nav-button">&lt;</Link>
            <br />
            <Link to="/projects-fun" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}