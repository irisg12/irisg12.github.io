import { Link } from "react-router-dom";
import './main.css'

import workRoom from './assets/room_work.png'
import letter from "./assets/letter.png"
import thread from "./assets/thread.png"
import wheel from "./assets/wheel.png"
import star from "./assets/star.png"

export default function Projects() {
  return (
    <>
      <h1> projects </h1>
        <p>(engineering)</p>
        <div className="room-container" style={{backgroundImage: `url(${workRoom})`}}>
            <Link to="/projects-fun" className="nav-button">&lt;</Link>
            <br />
            <Link to="/about" className="nav-button">&gt;</Link>
        </div>
    </>
  )
}